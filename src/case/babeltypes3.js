// 执行命令 node src/case/babeltypes3.js

const babel = require('babel-core')
const t = require('babel-types')

var target =
    `function count(n) {
	return n * n;
}`

var visitor = {
    BinaryExpression(path) {
        if (t.isIdentifier(path.node.left)) {
            console.log('检查节点的类型最好的方式')
        }
        if (t.isIdentifier(path.node.left, { name: "n" })) {
            console.log('对节点的属性们做浅层检查')
        }
        if (path.node.left != null && path.node.left.type === "Identifier" && path.node.left.name === "n") {
            console.log('功能上等价于')
        }
    },
    BinaryExpression(path) {
    	//如果你想访问到该属性内部的path，使用path对象的get方法，传递该属性的字符串形式作为参数。
        console.log('left节点名称: ' + path.get('left').node.name)
    },
    Program(path) {
    	//如果你想访问到该属性内部的path，使用path对象的get方法，传递该属性的字符串形式作为参数。
        console.log('body节点类型: ' + typeof path.get('body')[0])
    }
}

const result = babel.transform(target, {
    plugins: [{ visitor }]
})

console.log(result.code)

