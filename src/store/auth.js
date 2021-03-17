import api from "../networks/api";

export default {
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
  },
};
