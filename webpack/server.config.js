const merge = require('webpack-merge');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./base.config');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const path = require('path');

const server = merge(baseConfig, {
    entry: path.resolve(__dirname, '../src/entry-server.js'),
    target: 'node',
    devtool: 'sourve-map',
    output: {
        libraryTarget: 'commonjs2' // 跟 commonjs 的区别是其导出的是 module.exports.default 而不是 module.exports
    },
    externals: nodeExternals({ // whitelist 中的文件不外置, 而是交给 webpack 处理, 同理 .vue 文件也是
        whitelist: /.css$/
    }),
    plugins: [
        new VueSSRServerPlugin() // 将服务器整个输出, 构建为单个 JSON 文件的插件, 默认文件名为 vue-ssr-server-bundle.json
    ]
});

webpack(server, function (err, stats) {
    if (err) {
        throw err;
    }
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n');
    if (stats.hasErrors()) {
        console.log('\n\x1b[31mBuild failed with errors.\x1b[0m\n');
        process.exit(1);
    }
});
