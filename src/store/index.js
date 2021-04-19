import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import settings from "./settings";

import profile from "./profile";
import logout from "./logout";
import admin from "./admin";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
    token: localStorage.getItem("auth") || null,
    formPending: false,
    isShowLoadMenu: false,
    isThemeDark: JSON.parse(localStorage.getItem("isThemeDark")) || false,
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
    removeToken(state) {
      state.token = "";
    },
    setIsThemeDark(state, isThemeDark) {
      localStorage.setItem("isThemeDark", isThemeDark);
      state.isThemeDark = isThemeDark;
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

    profile,
    logout,
    admin,
  },
});
