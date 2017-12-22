// 导出一个 Vue 实例共享给服务端和客户端, 避免状态单例
import Vue from 'vue';
import App from './App';
import { createRouter } from './router';
import { createStore } from './store';
import { sync } from 'vuex-router-sync';

export function createApp() {
    const router = createRouter();
    const store = createStore();
    sync(store, router); // 同步路由状态到 store
    const app = new Vue({
        router, // 注入路由
        store, // 注入
        render: h => h(App)
    });
    return { app, router, store };
}
