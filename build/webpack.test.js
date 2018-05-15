const copyWebpackPlugin = require('copy-webpack-plugin');
// const path = require('path');

module.exports = {
    mode: 'development',
    plugins: [
        new copyWebpackPlugin([{
            from: './src',
            to: '../dist'
        }, {
            from: './config_dev/config.js',
            to: '../dist/js'
        }])
    ]
};