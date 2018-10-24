const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, './src/js/index.js'),
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: '/dist/',       //模板、样式、脚本、图片等资源对应的server上的路径
        filename: 'js/[name].js'
    },
    devServer: {
        contentBase: './',
        host: 'localhost',
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        /* new htmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html')
        }) */
        new htmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            // favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
            filename: './view/index.html', //生成的html存放路径，相对于path
            template: './src/view/index.html', //html模板路径
            inject: 'body', //js插入的位置，true/'head'/'body'/false
            // hash: true, //为静态资源生成hash值
            chunks: ['index'],//需要引入的chunk，不配置就会引入所有页面的资源
            minify: { //压缩HTML文件  
              removeComments: true, //移除HTML中的注释
              collapseWhitespace: false //删除空白符与换行符
            }
          }),
    ]
}