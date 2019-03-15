/**
 * @author zzl81cn
 * @date 2019-03-08
 * @description webpack多页面打包示例（自动遍历入口html-getRoot、js-getEntry）
 */
const path = require('path');
const fs = require("fs");
const glob = require("glob");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const wpUtils = require('./webpackConfig/wpUtils'); // 原getRoot()的抽取版本

const entry = getEntry(path.resolve(__dirname, 'src/js'));
let commonConfig = {
    entry: entry,
    output: {
      path: path.resolve('dist'),
      publicPath: '', //模板、样式、脚本、图片等资源对应的server上的路径
      filename: 'js/[name].js',
    },
    mode: 'production',
    module: {
        rules: [
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
                        limit: 8192,
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
        new CleanWebpackPlugin(path.resolve('./dist'), {
          // root: path.resolve('./'),    // 设置root
          verbose: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
          $: 'jQuery',
          jQuery: 'jQuery',
          "window.jQuery": 'jQuery'
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
          } */
        }),
        new CopyWebpackPlugin([
          {
            // shortcut icon
            from: path.resolve(__dirname, './src/touch-icon.jpg'),
            to: path.resolve('./dist/'),
          },
          {
            // 普通资源
            from: path.resolve(__dirname, './src/assets/'),
            to: path.resolve('./dist/assets/'),
            force: true,
            toType: 'dir',
          //   ignore: ['.*']
          },
          {
            // img的src类型静态资源
            from: path.resolve(__dirname, './src/externals/'),
            to: path.resolve('./dist/externals/'),
            force: true,
            toType: 'dir',
          },
        ]),
    
        new MiniCssExtractPlugin({filename: "css/[name].css"}),
        /* new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html')
        }) */
    ]
};

module.exports = commonConfig;
// 返回多入口文件遍历结果数组
function getEntry(){
    console.log('haha');

  let args = Array.prototype.slice.call(arguments)
      ,dir = args[0]
      ,_files = args[1]
      ,matchs=[]
      ,dirList = fs.readdirSync(dir)
  ;
  if(typeof(_files)=='undefined'){
      _files={};
  }
  dirList.forEach(function(item){
      let itemPath = path.resolve(dir,item);
      if(fs.statSync(itemPath).isDirectory()){
          getEntry(itemPath,_files);
      }else{
          matchs = item.match(/(.+)\.js$/);
          if(matchs){
              _files[matchs[1]] = itemPath;
          }
      }
  });
  return _files;
};

// 根据模板插入css/js等生成最终HTML.
wpUtils.getRoot('src/views/*.html').forEach(fileName => {
  let conf = {
      favicon: './src/touch-icon.jpg', //favicon路径，通过webpack引入同时可以生成hash值
      filename: 'views/' + fileName + '.html', // 生成的html存放路径，相对于 path
      template: path.resolve(__dirname, './src/views/' + fileName + '.html'), // html模板路径
      inject: true, // 'head', body, true, false
      hash: false, //为静态资源生成hash值
      minify: { //压缩HTML文件
          removeComments: false, //移除HTML中的注释
          minifyJS: false, //删除空白符与换行符
      },
      chunks: [fileName]
  };
  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
});
