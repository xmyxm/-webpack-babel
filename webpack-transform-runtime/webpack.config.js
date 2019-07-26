// webpackruntime.js
// 执行命令 webpack --config ./webpackdemo/webpackruntime.config.js

const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: {
        es6: ['./page/es6.js']
    },
    output: {
        path: path.join(__dirname, './', 'dist'),
        filename: '[name].js'
    },
    mode: 'development',
    // mode: 'production',
    devtool: '',
    module: {
        rules: [{
            test: /\.(es6|jsx|js)$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                //先执行完所有Plugin，再执行Preset。多个Plugin，按照声明次序顺序执行。多个Preset，按照声明次序逆序执行。
                "presets": [
                    [
                      "@babel/preset-env",
                      {
                        "loose": true,
                        "debug": true,
                        "targets": {
                            "browsers": [
                                'last 2 versions','Firefox ESR',
                                '> 1%',
                                'ie >= 9',
                                'iOS >= 8',
                                'Android >= 4',
                            ]
                        }
                      }
                    ]
                ],
                plugins: ['@babel/plugin-transform-runtime']
            }
        }]
    },
    plugins: [
        new webpack.BannerPlugin('点评平台研发中心')
    ]
}

// @babel/plugin-transform-runtime 不能单独使用，它需要指定 preset 为 es2015，env, typescript 还是 其他，才知道要转换的特性有哪些
