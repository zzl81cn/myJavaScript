const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let prodConfig = {
  mode: 'production',
  output: {
    path: path.resolve('./dist')
  },
  plugins: [
    new CleanWebpackPlugin(path.resolve('./dist'), {
      // root: path.resolve('./'),    // 设置root
      verbose: true
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
  ]
};

module.exports = prodConfig;
