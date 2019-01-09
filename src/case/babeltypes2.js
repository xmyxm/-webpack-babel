// 执行命令 node src/case/babeltypes2.js
const babel = require('babel-core')
const t = require('babel-types')

var target =
    `function count(n) {
	return n * n;
}`

var visitor = {
    BinaryExpression(path) {
        if (t.isBinaryExpression(path.node, { operator: "*" })) {
            path.replaceWith(
                t.binaryExpression("+", t.identifier("n"), t.identifier("n"))
            )
        }
    }
}

const updateParamsVisitor = {
    BinaryExpression(path) {
        if (path.node.operator == "*") {
            path.node.left = t.identifier(this.paramName)
            path.node.right = t.identifier(this.paramName)
        }
    }
}

visitor = {
    FunctionDeclaration(path) {
        const param = path.node.params[0]
        const paramName = "x"
        param.name = paramName
        path.traverse(updateParamsVisitor, { paramName })
    }
}

const result = babel.transform(target, {
    plugins: [{ visitor }]
})

console.log(result.code)
