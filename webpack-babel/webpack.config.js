// webpackruntime.js
// 执行命令 webpack --config ./webpackdemo/webpackruntime.config.js

const webpack = require('webpack')
const path = require('path')

module.exports = {
    mode: "development",
    entry: {
        home: ['./page/home.js'],
        list: ['./page/list.js'],
        detail: ['./page/detail.js']
    },
    output: {
        path: path.join(__dirname, './', 'dist'),
        filename: '[name].js'
    },
    mode: 'development',
    // mode: 'production',
    cache: true,
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
    module: {
        rules: [{
            test: /\.(es6|jsx|js)$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                //先执行完所有Plugin，再执行Preset。多个Plugin，按照声明次序顺序执行。多个Preset，按照声明次序逆序执行。
                // presets: [],
                // plugins: []
            }
        }]
    },
    plugins: [
        new webpack.BannerPlugin('点评平台研发中心')
    ]
}

// @babel/plugin-transform-runtime 不能单独使用，它需要指定 preset 为 es2015，env, typescript 还是 其他，才知道要转换的特性有哪些

// @babel/preset-env 会根据 browserlist 配置进行转换，如果需要兼容比较旧的浏览器，需要手动引入 @babel/polyfill
// useBuiltIns（根据 browserlist 是否转换新语法与 polyfill 新 API）
// false : 不启用polyfill, 如果 import '@babel/polyfill', 会无视 browserlist 将所有的 polyfill 加载进来
// entry : 启用，需要手动 import '@babel/polyfill', 这样会根据 browserlist 过滤出 需要的 polyfill
// usage : 不需要手动import '@babel/polyfill'(加上也无妨，构造时会去掉), 且会根据 browserlist + 业务代码使用到的新 API 按需进行 polyfill
// modules ("amd" | "umd" | "systemjs" | "commonjs" | "cjs" | false, defaults to "commonjs".)，转换 es6 模块语法到其他 模块规范， false不会转换

