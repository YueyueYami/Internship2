const webpack = require('webpack')
const path = require('path')
//引入模块
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const config = {
    //配置模式
    mode: 'development',
    //配置入口文件
    entry: './src/index.js',
    //配置出口文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/index.js',
        clean: true

    },
    //配置serve
    devServer: {
        //静态文件路径
        static: {
            directory: 'dist'
        },
        //端口号
        port: 3000
    },
    //配置插件
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/index.css'
        })
    ],
    //配置loader
    module: {
        rules: [{
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
        }]
    }
}
module.exports = config