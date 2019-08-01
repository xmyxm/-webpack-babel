const fs = require('fs')
const path = require('path')
const babel = require('babel-core')
const babelTypes = require('babel-types')
const filePath = path.resolve('../data/arrow.js')

const Visitor = {
    ArrowFunctionExpression: function ArrowFunctionExpression(path, state) {
        console.log(`箭头函数:ArrowFunctionExpression, 时间:${Date.now()}, 参数:${JSON.stringify(state)}`)
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
    },
    ThisExpression(path) {
        //构建var _this = this
        let node = babelTypes.VariableDeclaration(
                'var',
                [
                    babelTypes.VariableDeclarator(
                        babelTypes.Identifier('_this'),
                        babelTypes.Identifier('this')
                    )
                ]
            ),
            //构建 _this标识符
            str = babelTypes.Identifier('_this'),
            //查找变量声明的父节点
            //这里只是针对例子的，真正转换需要考虑的情况很多
            parentPath = path.findParent((path) => path.isVariableDeclaration())
        //满足条件
        if (parentPath) {
            //插入
            parentPath.insertBefore(node)
            path.replaceWith(
                str
            )
        } else {
            return
        }
    },
    //处理箭头函数。
    ArrowFunctionExpression(path) {
        var node = path.node
        //构造一个t.FunctionExpression节点，将原有path替换掉即可
        path.replaceWith(babelTypes.FunctionExpression(
            node.id,
            node.params,
            node.body
        ))
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