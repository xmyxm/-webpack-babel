const babel = require('babel-core')
const babelTypes = require('babel-types')

let code = 'let bad = true;'
// babelType：类似lodash那样的工具集，主要用来操作AST节点，比如创建、校验、转变等。举例：判断某个节点是不是标识符(identifier)。
function example({ types: babelTypes }) {
    return {
        name: "deadly-simple-plugin-example",
        // visitor：Babel采取递归的方式访问AST的每个节点，之所以叫做visitor，只是因为有个类似的设计模式叫做访问者模式，不用在意背后的细节。
        visitor: {
            // 1. path：AST中有很多节点，每个节点可能有不同的属性，并且节点之间可能存在关联。
            // path是个对象，它代表了两个节点之间的关联。你可以在path上访问到节点的属性，也可以通过path来访问到关联的节点（比如父节点、兄弟节点等）
            // 2. state：代表了插件的状态，你可以通过state来访问插件的配置项。
            // 3. Identifier、ASTNodeTypeHere：AST的每个节点，都有对应的节点类型，比如标识符（Identifier）、函数声明（FunctionDeclaration）等，
            // 可以在visitor上声明同名的属性，当Babel遍历到相应类型的节点，属性对应的方法就会被调用，传入的参数就是path、state。
            Identifier(path, state) {
                if (path.node.name === 'bad') {
                    path.node.name = 'good';
                }
            }
        }
    }
}

const result = babel.transform(code, {
    plugins: [{
        //前面的Visitor
        visitor: example(babelTypes).visitor
    }]
});
//输出转换之后的code
console.log(result.code);

