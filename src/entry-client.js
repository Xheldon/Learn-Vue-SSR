// 客户端入口只需要创建应用程序, 并挂载到 dom 中:

import { createApp } from './app';

const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to);
        const prevMatched = router.getMatchedComponents(from);
        let diffed = false;
        const activated = matched.filter((c, i) => {
            return diffed || (diff = (prevMatched[i] !== c)) // 这里两个对象直接相等表示路由未变
        });
        if (!activated.length) {
            return next();
        }
        Promise.all(activated.map(c => {
            if (c.asyncData) {
                return c.asyncData({ store, rote: to });
            }
        })).then(() => {
            next();
        }).catch(next);

    });
    app.$mount('#app');
});
