/**
 * @since 20181010 19:23
 * @author vivaxy
 * @see https://github.com/vivaxy/JavaScript/blob/master/lib/parse.js
 */

function parse(tokens) {

  return {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: parseExpression(0, tokens.length),
      }
    ],
  };

  function parseExpression(start, end) {
    let expression;
    let i = start;

    while (i < end) {

      let token = tokens[i];

      if (token.type === 'number') {

        if (!expression) {
          expression = {
            type: 'Literal',
            value: Number(token.value),
          };
        } else {
          throw new TypeError('Expression found.');
        }

        i++;
        continue;
      }

      if (token.type === 'operator') {

        if (token.value === '**') {

          /**
           *       **                             +
           *      / \     +     3      =>        / \
           *     1  2                           **  3
           *                                   / \
           *                                  1  2
           *
           *
           *       +                             +
           *      / \     **    3      =>       / \
           *     1  2                          1  **
           *                                      / \
           *                                     2  3
           */
          const parent = findParentNode(token.value, expression);
          if (!parent) {
            expression = {
              type: 'BinaryExpression',
              operator: token.value,
              left: expression,
              right: parseExpression(i + 1, i + 2),
            };
          } else {
            parent.right = {
              type: 'BinaryExpression',
              operator: token.value,
              left: parent.right,
              right: parseExpression(i + 1, i + 2),
            };
          }
          i += 2;
          continue;
        }

      }

      throw new TypeError('Unexpected token: ' + token.value);

    }

    return expression;
  }

  function findParentNode(operator, current, parent = null) {
    if (current.type === 'BinaryExpression') {
      if (hasHigherPrecedence(current.operator, operator)) {
        return parent;
      }
      return findParentNode(operator, current.right, current);
    }
    return parent;
  }

  function hasHigherPrecedence(op1, op2) {
    return false;
  }
}

console.log(JSON.stringify(parse([
  { type: 'number', value: '1' },
  { type: 'operator', value: '**' },
  { type: 'number', value: '2' }
]), null, 2));
