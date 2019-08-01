// 执行命令 node src/case/babeltraverse.js

const babylon = require("babylon")
const traverse = require("babel-traverse")

var target =
    `function square(n) {
	return n * n;
}`

const ast = babylon.parse(target)

const result = traverse.default(ast, {
    enter(path) {
        if (path.node.type === "Identifier" && path.node.name === "n") {
            path.node.name = "x"
        }
    }
})
