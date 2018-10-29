const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let devConfig = {
  mode: 'development',
  devServer: {
    contentBase: './',
    host: 'localhost',
    port: 9000,
    hot: true
  },
  /* resolve:{
    alias: {
        jQuery: path.resolve(__dirname, './src/libs/jquery/jquery.min.js'),
    }
  }, */
  plugins: [
    /* new webpack.ProvidePlugin({
      $: 'jQuery',
      jquery: 'jQuery',
      jQuery: 'jQuery',
      "window.jQuery": 'jQuery'
    }), */
  ]
};

module.exports = devConfig;
