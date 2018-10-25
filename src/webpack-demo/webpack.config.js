const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    // entry: path.resolve(__dirname, './src/js/index.js')
    entry: {
        index: './src/js/index.js',
        test: './src/js/test.js'
    },
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: '/dist/',       //模板、样式、脚本、图片等资源对应的server上的路径
        filename: 'js/[name].js',
        // chunkFilename: 'js/[id].chunk.js'
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
        /* new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
            chunks: ['index','test'], //提取哪些模块共有的部分
            minChunks: 2 // 提取至少3个模块共有的部分
        }), */
        new webpack.optimize.SplitChunksPlugin({
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '-',
            name: true,
            /* cacheGroups: {
                vue: {
                    test: /[\\/]node_modules[\\/]vue[\\/]/,
                    priority: -10,
                    name: 'vue'
                },
                'tui-chart': {
                    test: /[\\/]node_modules[\\/]tui-chart[\\/]/,
                    priority: -20,
                    name: 'tui-chart'
                }
            } */
        }),

        /* new htmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html')
        }) */
        new htmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            // favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
            filename: './view/index.html', //生成的html存放路径，相对于path
            template: './src/view/index.html', //html模板路径
            inject: true, //js插入的位置，true/'head'/'body'/false
            // hash: true, //为静态资源生成hash值
            chunks: ['index'],//需要引入的chunk，不配置就会引入所有页面的资源
            minify: { //压缩HTML文件  
              removeComments: true, //移除HTML中的注释
              collapseWhitespace: false //删除空白符与换行符
            }
          }),
        new htmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            // favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
            filename: './view/test.html', //生成的html存放路径，相对于path
            template: './src/view/test.html', //html模板路径
            inject: true, //js插入的位置，true/'head'/'body'/false
            // hash: true, //为静态资源生成hash值
            chunks: ['test'],//需要引入的chunk，不配置就会引入所有页面的资源
            minify: { //压缩HTML文件  
              removeComments: true, //移除HTML中的注释
              collapseWhitespace: false //删除空白符与换行符
            }
          }),
    ]
}