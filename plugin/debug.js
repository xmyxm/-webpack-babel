var babel = require('babel-core');
var t = require('babel-types');
var code = `var func = ()=>{
    console.log(this.b)
  };`

const Visitor = {
    //this表达式
    ThisExpression(path) {
        //构建var _this = this
        let node = t.VariableDeclaration(
                'var',
                [
                    t.VariableDeclarator(
                        t.Identifier('_this'),
                        t.Identifier('this')
                    )
                ]
            ),
            //构建 _this标识符
            str = t.Identifier('_this'),
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
        path.replaceWith(t.FunctionExpression(
            node.id,
            node.params,
            node.body
        ))
    }
}

const result = babel.transform(code, {
    plugins: [{
        //前面的Visitor
        visitor: Visitor
    }]
});
//输出转换之后的code
/**
 * var _this = this;
 * var func = function () {
 * console.log(_this.b);
 * }; 
 */
console.log(result.code);

