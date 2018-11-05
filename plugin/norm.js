const babel = require('babel-core')
const babelTypes = require('babel-types')

let code = 'let bad = true;'
function example({ types: babelTypes }) {
    return {
        name: "deadly-simple-plugin-example",
        visitor: {
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

