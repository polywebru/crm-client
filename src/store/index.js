import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
    token: "",
    formPending: false,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    setToken(state, token) {
      state.token = token;
    },
    setFormPending(state, formPending) {
      state.formPending = formPending;
    },
  },
  actions: {},
  getters: {
    error: (state) => state.error,
    token: (state) => state.token,
  },
  modules: {
    auth,
  },
});
