// 执行命令 node src/case/babeltemplate.js
const template = require('babel-template')
const generator = require('babel-generator')
const t = require('babel-types')

const buildRequire = template(`
  var IMPORT_NAME = require(SOURCE)
`);

const ast = buildRequire({
    IMPORT_NAME: t.identifier("myModule"),
    SOURCE: t.stringLiteral("my-module")
});

console.log(generator.default(ast).code)
//var myModule = require("my-module")

