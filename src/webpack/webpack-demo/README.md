## directory structure
``` bash
dist
├── app.bundle.0e380cea371d050137cd.js
├── index.html
└── style.css
```
## config example
``` javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); //引入插件html-webpack-plugin
// const ExtractTextPlugin = require('extract-text-webpack-plugin');//引入插件extract-text-webpack-plugin
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");//引入插件mini-css-extract-plugin
const CleanWebpackPlugin = require('clean-webpack-plugin'); //引入清除文件插件

module.exports = {
    entry: {
        'app.bundle': './src'
    }, // 输入文件路径 entry 的默认值是 ./src
    output: {
        path: __dirname + '/dist', //output.path 的默认值是 ./dist　path:对应一个绝对路径，此路径是希望一次性打包的目录
        //修改为hash模式
        filename: '[name].[chunkhash].js' // 能指定出口文件中同样的filename名称　filename:编译文件的文件名，首选推荐：main.js||bundle.js||index.js
    },
    devServer: {
        port: 9000,
        open: true
    },

    // 由于plugin可以携带参数和选项，必须在wepback配置中，向plugins属性传入new实例
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', //根据自己的指定的模板文件来生成特定的 html 文件。这里的模板类型可以是任意你喜欢的模板，可以是 html, jade, ejs, hbs, 等等，但是要注意的是，使用自定义的模板文件时，需要提前安装对应的loader， 否则webpack不能正确解析
            filename: 'index.html', // 默认情况下生成的 html 文件叫 index.html
            minify:{
                collapseWhitespace: true, //把生成的 index.html 文件的内容的没用空格去掉，减少空间
            },
            hash: true, //为了更好的 cache，可以在文件名后加个 hash。
        }),
        // new ExtractTextPlugin('style.css') //实例ExtractTextPlugin，4.0弃用
        // new MiniCssExtractPlugin({//实例MiniCssExtractPlugin
        //   // Options similar to the same options in webpackOptions.output
        //   // both options are optional
        //   filename: "style.css",
        //   chunkFilename: "app.scss"
        // })
        new CleanWebpackPlugin(['dist']),//实例化，参数为目录
    ],
    module: {
        rules: [
            {
                test: /\.scss$/, //正则验证格式

                use: ['style-loader', 'css-loader', 'sass-loader'] //安装的loader

                // ExtractTextPlugin 4.0弃用
                // use: ExtractTextPlugin.extract({
                //   fallback: 'style-loader',
                //   //resolve-url-loader may be chained before sass-loader if necessary
                //   use: ['css-loader', 'sass-loader']
                // })

                // MiniCssExtractPlugin
                // use: [
                //   // MiniCssExtractPlugin.loader,
                //   "css-loader",
                //   'sass-loader'
                // ]
            }
        ]
    },
};
```

## other config
``` javascript
// package

    "webpack": "^4.20.2",
    "webpack-cli": "~3.1.1",

// dev
    devServer:{
        host: '0.0.0.0',

// base

    presets: ['@babel/preset-env',
        {
            "targets": {
                "ie": "10"
            }
        }
    ]
```

### test data
``` javascript
// 渲染普通表格
function drawTable(data) {
  // console.log('table ok')
  var htmlStr = '',
      data = data.data;
  $('#tableNormal tbody').html(function () {
    $.each(data, function (i, n) {
      htmlStr += '<tr>'
        + '<td>' + n.key + '</td>'
        + '<td>' + n.accountNo + '</td>'
        + '<td>' + n.owner + '</td>'
        + '<td>' + n.titles + '</td>'
        + '<td>' + n.status + '</td>'
        + '<td>' + n.validity + '</td>'
        + '<td>' + n.callNo + '</td>'
        + '<td>' + n.email + '</td>'
        + '<td>' + n.callNo + '</td>'
        + '<td>' + n.gender + '</td>'
        + '</tr>'
    });
    return htmlStr;
  });
};
$.ajax({
  url: "../static/json/standardTable.json",
  type: "GET",
  success: function(data) {
    drawTable(data);
  },
  error: function(error) {
    console.log('is error')
  }
});

// Mock data
function tableData() {
  let tableListDataSource = [];
  let date = new Date();
  for (let i = 0; i < 10; i += 1) {
    tableListDataSource.push({
      key: i,
      no: 'TradeCode' + i,
      /* accountNo: `0200012 ${i}`, */
      accountNo: '0200012'+ i,
      owner: 'xx',
      titles: 'xx' + i,
      description: '这是一段描述',
      callNo: Math.floor(Math.random() * 1000),
      email: Math.random().toString(36).substr(2) + '@coamc.com',
      status: Math.floor(Math.random() * 10) % 4,
      validity: date.getFullYear() + 3 +
        '-' + (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) +
        '-' + (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()),
      gender: i % 6 === 0,
      progress: Math.ceil(Math.random() * 100),
    });
  }
  // drawTable(tableListDataSource);
};
// tableData();
```

## point
- js打包时，引入js的相关资源（css，font等）会根据配置以及路径放置到样式文件夹内，例如“css”，但要注意文件名书写的正确，此处情景极易犯错；
- ES5支持需要一个[polyfill](https://webpack.docschina.org/guides/shimming/#%E5%8A%A0%E8%BD%BD-polyfills)；

## rules
- test后面的是正则表达式，不要加引号（单引号、双引号都不要）；

## plain
- add jquery dependencies.

## history
- [multiple entry SplitChunksPlugin setting](https://futu.im/posts/2018-05-07-webpack4/)
- 20181025 search splitchunksplugin使用.
- 20181027 webpack静态HTML如何打包插入图片.

## xx
- 感觉webpack4的时候，更注重了配置，写的配置信息其实就是参数;<2019-03-11>
- UI组件使用原生js，其他依靠css，是不是更容易实现跨前端框架;<2019-03-11>
- 现在的开发产出解决了上一次未解决的问题，例如：menuData API的方式;
- static task，nodejs、express、template engine(artTemplate)、webpack、gulp;
- 示例组合之webpack+react(vue, ...)
- 示例组合之nodejs+webpack+jquery(react, vue)