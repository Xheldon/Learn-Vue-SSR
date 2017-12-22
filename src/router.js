// 路由可以客户端和服务端同时复用, 同样的, 也是导出一个构造函数

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export function createRouter() {
    return new Router({
        mode: 'history',
        routed: [
            {path: '/', component: () => import('./components/Home.vue')}
        ]
    });
}
