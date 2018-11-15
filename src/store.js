import Vue from 'vue';
import Vuex from 'vuex';
import { getSomething } from './api';

Vue.use(Vuex);

export function createStore() {
    return new Vuex.Store({
        state: {
            items: {}
        },
        actions: {
            fetchItem ({ commit }, id) {
                return getSomething(id).then((text) => {
                    commit('setItem', {id, text});
                }, (err) => {
                    console.log('err5:', err);
                });
            }
        },
        mutations: {
            setItem (state, { id, text }) {
                Vue.set(state.items, id, text)
            }
        }
    });
}
