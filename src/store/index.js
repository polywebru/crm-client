import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import settings from "./settings";
import mainLayout from "./mainLayout";
import profile from "./profile";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
    token: null,
    formPending: false,
    isShowLoadMenu: false,
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
    setShowLoadMenu(state, showLoadMenu) {
      state.isShowLoadMenu = showLoadMenu;
    },
  },
  actions: {},
  getters: {
    error: (state) => state.error,
    token: (state) => state.token,
  },
  modules: {
    auth,
    settings,
    mainLayout,
    profile,
  },
});
