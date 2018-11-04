/**
 * @since 20181010 20:12
 * @author vivaxy
 * @see https://github.com/vivaxy/JavaScript/blob/master/lib/serialize.js
 */

function codeGenerate(ast) {
  switch (ast.type) {
    case 'Program':
      return ast.body.map(codeGenerate).join('\n');
    case 'ExpressionStatement':
      return codeGenerate(ast.expression) + ';';
    case 'CallExpression':
      return codeGenerate(ast.callee) + '(' + ast.arguments.map(codeGenerate).join(', ') + ')';
    case 'MemberExpression':
      if (ast.computed) {
        return codeGenerate(ast.object) + '[' + codeGenerate(ast.property) + ']';
      }
      return codeGenerate(ast.object) + '.' + codeGenerate(ast.property);
    case 'Identifier':
      return ast.name;
    case 'Literal':
      switch (typeof ast.value) {
        case 'number':
        case 'boolean':
          return String(ast.value);
        case 'string':
          return '"' + ast.value + '"';
        default:
          throw new Error('Unexpected ast.value type: ' + typeof ast.value);
      }
    default:
      throw new Error('Unexpected ast.type: ' + ast.type);
  }
}

console.log(codeGenerate({
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
