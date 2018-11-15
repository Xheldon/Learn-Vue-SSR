const path = require('path');
module.exports = {
    output: {
        path: path.resolve(__dirname, '../bundle'),
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /.vue$/,
            loader: 'vue-loader',
        }]
    }
};
