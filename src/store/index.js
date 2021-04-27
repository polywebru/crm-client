import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import universityInfo from "./universityInfo";

import profile from "./profile";
import logout from "./logout";
import admin from "./admin";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: {},
    token: localStorage.getItem("auth") || null,
    fullName: localStorage.getItem("fullName") || "",
    username: localStorage.getItem("username") || "",
    formPending: false,
    isShowLoadMenu: false,
    inActiveUser: false,
    isThemeDark: JSON.parse(localStorage.getItem("isThemeDark")) || false,
    validationErrors: {
      required: ["Это обязательное поле"],
      email: ["Неверный email"],
      maxLength: ["Максимальное количество символов 255"],
      minLengthPassword: ["Минимальная длина пароля 5"],
      passwordsNotMatch: ["Пароли не совпадают"],
    },
  },
  mutations: {
    setError(state, error) {
      state.error = { ...state.error, ...error };
    },
    removeErrors(state) {
      state.error = {};
    },
    setInActive(state, inactive) {
      state.inActiveUser = inactive;
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
    setFullName(state, fullName) {
      localStorage.setItem("fullName", fullName);
      state.fullName = fullName;
    },
    setUsername(state, username) {
      localStorage.setItem("username", username);
      state.username = username;
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
    universityInfo,
    profile,
    logout,
    admin,
  },
});
