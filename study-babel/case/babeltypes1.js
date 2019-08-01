// 执行命令 node src/case/babeltypes1.js

const babylon = require("babylon")
const traverse = require("babel-traverse")
const t = require("babel-types")

var target =
    `function square(n) {
	return n * n;
}`

const ast = babylon.parse(target)

const result = traverse.default(ast, {
    enter(path) {
        if (t.isIdentifier(path.node, { name: "n" })) {
	      path.node.name = "x";
	    }
    }
})



