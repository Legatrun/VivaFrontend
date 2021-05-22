import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: false,
    server: 'http://localhost:57171/',
  },
  plugins: [
    createPersistedState({
      key: 'auth',
    }),
  ],
  mutations: {
    login(state) {
      state.auth = true;
    },
    logout(state) {
      state.auth = false;
    },
    setServer(state, value) {
      state.server = value;
    },
  },
  actions: {},
});

