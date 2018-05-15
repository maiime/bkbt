const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    plugins: [
        new copyWebpackPlugin([{
            from: './src',
            to: '../dist'
        }, {
            from: './config_prod/config.js',
            to: '../dist/js'
        }])
    ]
};