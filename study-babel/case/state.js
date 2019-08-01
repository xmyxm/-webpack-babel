// 执行命令 node src/case/state.js

const babel = require('babel-core')

var target =
`function count(n) {
	function abs(number) {
	    if (number >= 0) {
	        return number
	    } else {
	        return -number
	    }
	}
	n = abs(n)
	return n * n;
}`

const updateNameVisitor = {
    Identifier(path) {
        if (path.node.name === this.paramName) {
            path.node.name = "x"
        }
    }
}

var visitor = {
    FunctionDeclaration(path) {
        const param = path.node.params[0]
        const paramName = param.name
        param.name = "x"
        path.traverse(updateNameVisitor, { paramName })
    }
}

const result = babel.transform(target, {
    plugins: [{ visitor }]
})

console.log(result.code)


