/**
 * @since 20181010 19:16
 * @author vivaxy
 */

function tokenize(input) {
  let i = 0;
  let tokens = [];

  const WHITE_SPACE = /\s/;
  const NUMBER = /[0-9]/;

  while (i < input.length) {
    let char = input[i];

    if (WHITE_SPACE.test(char)) {
      i++;
      continue;
    }

    if (NUMBER.test(char)) {
      let value = '';

      while (NUMBER.test(char)) {
        value += char;
        char = input[++i];
      }

      tokens.push({ type: 'number', value });
      continue;
    }

    if (char === '*') {
      if (input[i + 1] === '*') {
        i += 2;
        tokens.push({ type: 'operator', value: '**' });
        continue;
      }
    }

    throw new TypeError('Unexpected token: ' + char);
  }

  return tokens;
}

console.log(JSON.stringify(tokenize('1 ** 2'), null, 2));
