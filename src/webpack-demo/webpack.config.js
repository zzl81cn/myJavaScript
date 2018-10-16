const path = require('path');
const htmlWebpackPlugins = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src/js/index.js'),
    output: {
        path: path.join(__dirname, "dist"),
        filename: 'bundle.js'
    },
    devServer: {
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
        new htmlWebpackPlugins({
            // template: path.resolve(__dirname, 'src/index.html')
            template: 'src/index.html'
        })
    ]
}