// 执行命令 node src/case/babelgenerator.js
const babylon = require('babylon')
const generator = require('babel-generator')

var target =
`function count(n) {
	return n * n
}`

const ast = babylon.parse(target)

const result = generator.default(ast, {}, target)

console.log(result.code)

