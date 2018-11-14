// 服务端入口导出一个函数, 每次渲染的时候, 重复调用次含税

import { createApp } from './app';
export default context => {
    return new Promise((resolve, reject) => {
        const { app, router } = createApp();
        router.push(context.url);
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents(); // 在 router.js 中配置的 路径: 组件 对应关系, 在这里查询是否匹配
            if (!matchedComponents.length) {
                return reject({code: 404});
            }
            // mathedComponents 返回路由匹配的组件实例
            Promise.all(matchedComponents.map((Component) => {
                if (Component.asyncData) {
                    return Component.asyncData({
                        store,
                        route: router.currentRoute
                    });
                }
            })).then(() => {
                context.state = store.state;
                resolve(app);
            });
        }, reject);
    });
}
