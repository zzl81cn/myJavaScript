const webpackMerge = require('webpack-merge');//用于合并webpack配置
const webpackCommonConfig = require('./webpackConfig/webpack.common.config.js');

let ENV = process.env.NODE_ENV;
console.log('evn', ENV);
let webpackConfig ={};
switch (ENV) {
    case 'dev':
        const webpackDevConfig = require('./webpackConfig/webpack.dev.config.js');
        webpackConfig = webpackMerge(webpackCommonConfig, webpackDevConfig);
        break;
    case 'prod':
        const webpackProdConfig = require('./webpackConfig/webpack.prod.config.js');
        webpackConfig = webpackMerge(webpackCommonConfig, webpackProdConfig);
        break;
    default:
        break;
};

module.exports = webpackConfig;
