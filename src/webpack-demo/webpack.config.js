const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    // mode: 'production',
    // entry: path.resolve(__dirname, './src/js/index.js')
    entry: {
        index: './src/js/index.js',
        test: './src/js/test.js'
    },
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: '/',       //模板、样式、脚本、图片等资源对应的server上的路径
        filename: 'js/[name].js',
        // chunkFilename: 'js/[id].chunk.js'
    },
    devServer: {
        contentBase: './',
        host: 'localhost',
        port: 9000,
        hot: true
    },
    module: {
        rules: [
            /* {
                test: /\.html/,
                use: 'html-loader'
            }, */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                // include: path.resolve('./src/js/app'),
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },{
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },{//图片设置，小于8192自动打包为base64
                test: /\.(png|jpg|gif|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        // limit: 8192,
                        mimetype:'image/png',
                        publicPath : '../',
                        name:'images/[name].[ext]'
                    }
                }]
            },{//对字体文件的处理
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        publicPath : '../',
                        name:'fonts/[name].[ext]'
                    }
                }]
            }
        ]
    },
    resolve:{
        alias: {
            jQuery: path.resolve(__dirname, './src/libs/jquery/jquery.min.js'),
        }
    },
    plugins: [
        /* new CleanWebpackPlugin(path.resolve('./dist'), {
            // root: path.resolve('./'),    // 设置root
            verbose: true
        }), */

        /* new copyWebpackPlugin([
            {
                from: "./src/externals"
                // ,to: 'externals'
                ,force: true
                ,toType: 'dir'
            }
        ]), */
        new CopyWebpackPlugin([
            {
              from: path.resolve(__dirname, './src/externals/images'),
            //   to: path.resolve(__dirname, '/externals/'),
                to: path.resolve('./dist/externals/images'),
              force: true,
              toType: 'dir',
            //   ignore: ['.*']
            }
        ]),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: 'jQuery',
            jQuery: "jQuery",
            "window.jQuery": "jQuery"
        }),
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
        new MiniCssExtractPlugin({filename: "css/[name].css"}),
        /* new htmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html')
        }) */
        new htmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            // favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
            filename: './view/index.html', //生成的html存放路径，相对于path
            template: './src/view/index.html', //html模板路径
            title: 'index',
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
            title: 'test',
            inject: true, //js插入的位置，true/'head'/'body'/false
            // hash: true, //为静态资源生成hash值
            chunks: ['test'],//需要引入的chunk，不配置就会引入所有页面的资源
            minify: { //压缩HTML文件  
              removeComments: true, //移除HTML中的注释
              collapseWhitespace: false //删除空白符与换行符
            }
          }),
        new htmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            // favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
            filename: './view/icon.html', //生成的html存放路径，相对于path
            template: './src/view/icon.html', //html模板路径
            title: 'icon',
            inject: true, //js插入的位置，true/'head'/'body'/false
            // hash: true, //为静态资源生成hash值
            chunks: ['icon'],//需要引入的chunk，不配置就会引入所有页面的资源
            minify: { //压缩HTML文件  
              removeComments: true, //移除HTML中的注释
              collapseWhitespace: false //删除空白符与换行符
            }
          }),
    ]
}