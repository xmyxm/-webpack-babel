// webpackruntime.js
// 执行命令 webpack --config ./webpackdemo/webpackruntime.config.js

const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: {
        es6: ['./webpackdemo/page/es6.js']
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
                presets: ['stage-0', 'es2015'],
                plugins: ['transform-runtime']
            }
        }]
    },
    plugins: [
        new webpack.BannerPlugin('点评平台研发中心')
    ]
}

