const path = require('path');

module.exports = {
    mode: 'production',
    entry: './js/all.js',
    output: {
        path: path.resolve(__dirname, '../js'),
        filename: 'libs.js'
    }
}