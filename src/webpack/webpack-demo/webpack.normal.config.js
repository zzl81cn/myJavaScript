const path = require('path');
const fs = require("fs");
const glob = require("glob");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const entry = getEntry(path.resolve(__dirname, './src/js'));
let commonConfig = {
    // entry: path.resolve(__dirname, './src/js/index.js')
    /* entry: {
        index: './src/js/index.js',
        test: './src/js/test.js',
        icon: './src/js/icon.js'
    }, */
    entry: entry,
    /**
     * 以下路径相当于：
     * 1.path： 文件输出路径，那这里就是根目录下的“dist”，后面的配置均以此为根目录；
     * 2.publicPath：资源路径，这里就是接着“dist”后面来了；
     * 3.filename：字符串内一般文件名前加了对应的类型文件夹，这里的意思就是把js文件设为“./dist/js/*.js”；
      */
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/', //模板、样式、脚本、图片等资源对应的server上的路径(公式：静态资源最终访问路径 = output.publicPath + 资源 loader 或插件等配置路径)
        filename: 'js/[name].js',
        // chunkFilename: 'js/[id].chunk.js'
    },
    mode: 'development',
    devServer: {
      contentBase: './',
      host: '0.0.0.0',
      port: 9000,
      hot: true
    },
  
    module: {
        rules: [
            /* {
              test: /\.html$/,
              use: 'html-loader'
            }, */
            /* {
                test: require.resolve('jQuery'),  // 此loader配置项的目标是NPM中的jquery
                loader: 'expose?$!expose?jQuery', // 先把jQuery对象声明成为全局变量`jQuery`，再通过管道进一步又声明成为全局变量`$`
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
            from: path.resolve(__dirname, './src/externals/images'),
          //   to: path.resolve(__dirname, '/externals/'),
              to: path.resolve('./dist/externals/images'),
            force: true,
            toType: 'dir',
          //   ignore: ['.*']
          }
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
getRoot('src/views/*.html').forEach(fileName => {
  let conf = {
      favicon: './src/touch-icon.jpg', //favicon路径，通过webpack引入同时可以生成hash值
      template: './src/views/' + fileName + '.html', // html模板路径
      filename: 'views/' + fileName + '.html', // 生成的html存放路径，相对于 path
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

// 返回多入口文件遍历结果数组（主文件名部分，不含扩展名）
function getRoot(viewsPath) {
  let files = glob.sync(viewsPath);
  let entries = [];
  let entry, basename, extname;

  for (let i = 0; i < files.length; i++) {
      entry = files[i];
      extname = path.extname(entry); // 扩展名 eg: .html
      basename = path.basename(entry, extname);  // eg: index
      entries.push(basename);
  }
  return entries;
}
