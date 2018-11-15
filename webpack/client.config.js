/*
* 客户端需要生成一个 manifest, 同时服务端也会生成一个 manifest, 两者都交给 renderer 进行比较, 从而得知哪些需要预加载/预取等信息
* */

const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./base.config');
const VueSSrClientPlugin = require('vue-server-renderer/client-plugin');
const path = require('path');
const client = merge(baseConfig, {
    entry: path.resolve(__dirname, '../src/entry-client.js'),
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        }),
        new VueSSrClientPlugin() // 此插件在输出目录中输出 vue-ssr-client-manifest.json
    ]
});

webpack(client, function (err, stats) {
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
