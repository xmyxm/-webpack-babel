// babel.transform(code: string,
//     options ? : Object,
//     callback: Function)
// eg:
const babel = require('babel-core')
var es6Code = 'let x = n => n + 1';
let result = babel.transform(es6Code, { presets: ['es2015'] })
console.log(result)
