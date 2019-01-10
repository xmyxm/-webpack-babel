// 执行命令 node src/case/path1.js

const babel = require('babel-core')
const t = require('babel-types')

var target =
    `function count(n) {
	return n * n;
}`

var visitor = {
    BinaryExpression(path) {
    	// 从一个路径向上遍历语法树，直到满足相应的条件。
		// 对于每一个父路径调用callback并将其NodePath当作参数，当callback返回真值时，则将其NodePath返回
        var parentFun = path.findParent((path) => path.isFunctionDeclaration())
        console.log(parentFun.node.params[0].name)
        //parentFun.node.params[0].name = "m"

        //如果也需要遍历当前节点：
        var returnStatement = path.find((path) => path.isReturnStatement())
        console.log(returnStatement.node.type)

        //查找最接近的父函数或程序：
        var funParent = path.getFunctionParent()
        console.log(funParent.node.type)

        // 向上遍历语法树，直到找到在列表中的父节点路径
        var statement = path.getStatementParent()
        console.log(statement.node.type)

    }
}

const result = babel.transform(target, {
    plugins: [{ visitor }]
})

console.log(result.code)

