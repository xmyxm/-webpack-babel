const fs = require('fs')
const path = require('path')
const babel = require('babel-core')
const babelTypes = require('babel-types')
const filePath = path.resolve('../src/js/arrow.js')


const Visitor = {
    ArrowFunctionExpression: function ArrowFunctionExpression(path, state) {
        if (state.opts.spec) {
            var node = path.node;

            if (node.shadow) return;

            node.shadow = { this: false };
            node.type = "FunctionExpression";

            var boundThis = babelTypes.thisExpression();
            boundThis._forceShadow = path;

            path.ensureBlock();
            path.get("body").unshiftContainer("body", babelTypes.expressionStatement(babelTypes.callExpression(state.addHelper("newArrowCheck"), [babelTypes.thisExpression(), boundThis])));

            path.replaceWith(babelTypes.callExpression(babelTypes.memberExpression(node, babelTypes.identifier("bind")), [babelTypes.thisExpression()]))
        } else {
            path.arrowFunctionToShadowed();
        }
    }
}

// 读取js文件字符串
const code = fs.readFileSync(filePath, 'utf-8')

// 输出转换之前的code
console.log(code)

const result = babel.transform(code, {
    plugins: [{
        //前面的Visitor
        visitor: Visitor
    }]
})

// 输出转换之后的code
console.log(result.code)