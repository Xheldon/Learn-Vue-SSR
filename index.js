const Vue = require('vue');
const server = require('express')();
const { createBundleRenderer } = require('vue-server-renderer');

const template = require('fs').readFileSync('./tpl/index.html', 'utf-8');
const serverBundle = require('./bundle/vue-ssr-server-bundle.json');
const clientManifest = require('./bundle/vue-ssr-client-manifest.json');

const renderer = createBundleRenderer(serverBundle, {
    template,
    clientManifest
});

server.get('*', (req, res) => {
    const context = {
        url: req.url
    };
    renderer.renderToString(context, (err, html) => {
        if (err) {
            console.log(err, err.stack);
            res.status(500).end('Internal Server Error');
            return
        }
        res.end(html);
    })
});
server.listen(8080);
