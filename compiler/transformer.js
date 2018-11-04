/**
 * @since 20181010 20:07
 * @author vivaxy
 */

function transform(ast) {

  let expression = ast.body[0].expression;

  if (expression.type === 'BinaryExpression' && expression.operator === '**') {
    expression = {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        computed: false,
        object: { type: 'Identifier', name: 'Math' },
        property: { type: 'Identifier', name: 'pow' }
      },
      arguments: [
        expression.left,
        expression.right,
      ]
    }
  }

  return {
    type: 'Program',
    body: [expression],
  };

}

console.log(JSON.stringify(transform({
  type: 'Program',
  body: [
    {
      type: 'ExpressionStatement',
      expression: {
        type: 'BinaryExpression',
        operator: '**',
        left: {
          type: 'Literal',
          value: 1
        },
        right: {
          type: 'Literal',
          value: 2
        }
      }
    }
  ]
}), null, 2));
