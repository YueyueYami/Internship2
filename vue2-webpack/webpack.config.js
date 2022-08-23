const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const config = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js',
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html'
        }),
        new VueLoaderPlugin()
    ],
    devServer: {
        port: 3000,
        static: 'dist'
    },
    module: {
        rules: [
            { test: /\.vue$/, loader: 'vue-loader' }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue']
    }
}
module.exports = config