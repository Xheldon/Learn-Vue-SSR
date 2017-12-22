import Vue from 'vue';
import Vuex from 'vuex';
import { getSomething } from './api';

Vue.use(vuex);

export function createStore() {
    return new Vuex.Store({
        state: {
            text: ''
        },
        actions: {
            fetchItem ({ commit }) {
                return getSomething('holy shit').then((text) => {
                    console.log('res', res);
                    commit('setItem', {text});
                });
            }
        },
        mutations: {
            setItem (state, { text }) {
                Vue.set(state.text, text)
            }
        }
    });
}
