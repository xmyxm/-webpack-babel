/**
 * @since 20181010 20:21
 * @author vivaxy
 * @see https://github.com/vivaxy/JavaScript/blob/master/lib/execute.js
 */

function execute(ast) {
  switch (ast.type) {
    case 'Program':
      return ast.body.reduce((ret, body) => {
        return execute(body);
      }, undefined);
    case 'ExpressionStatement':
      return execute(ast.expression);
    case 'CallExpression':
      return execute(ast.callee).apply(null, ast.arguments.map(execute));
    case 'MemberExpression':
      if (ast.computed) {
        return execute(ast.object)[execute(ast.property)];
      }
      return execute(ast.object)[ast.property.name];
    case 'Identifier':
      return global[ast.name];
    case 'Literal':
      return ast.value;
    default:
      throw new Error('Unexpected ast.type: ' + ast.type);
  }
}

console.log(execute({
  type: 'Program',
  body: [
    {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        computed: false,
        object: {
          type: 'Identifier',
          name: 'Math'
        },
        property: {
          type: 'Identifier',
          name: 'pow'
        }
      },
      arguments: [
        {
          type: 'Literal',
          value: 1
        },
        {
          type: 'Literal',
          value: 2
        }
      ]
    }
  ]
}));
