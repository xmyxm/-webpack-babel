// 执行命令 node src/case/visitor.js

const babel = require('babel-core')

var target =
`function square(n) {
	return n * n;
}`

var visitor = {
    Identifier(path) {
        console.log(`${path.node.name}开始调用!`)
    }
}

visitor = {
    Identifier: {
        enter(path) {
            console.log(`${path.node.name}进入节点!`)
        },
        exit(path) {
            console.log(`${path.node.name}离开节点!`)
        }
    }
}

const result = babel.transform(target, {
    plugins: [{ visitor }]
})



