import api from "../api";

export default {
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = { ...state.user, ...user };
    },
  },
  actions: {
    async login({ commit }, user) {
      try {
        const response = await api.login(user);
        commit("setToken", response.headers.authorization);
      } catch (e) {
        commit("setError", e.response.data.error.code);
        throw e;
      }
    },

    async register({ commit }, user) {
      try {
        const response = await api.registerUser(user);
        commit("setToken", response.headers.authorization);
      } catch (error) {
        commit("setError", error.response.data.error.errors);
        throw error;
      }
    },
  },
};
