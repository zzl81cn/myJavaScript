const path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: '/\.css$/',
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}