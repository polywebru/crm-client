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
    async login({ commit, dispatch }, user) {
      try {
        const response = await api.login(user);
        commit("setToken", response.headers.authorization);
        localStorage.setItem("auth", response.headers.authorization);

        await dispatch("getUserInfo", {});
        await dispatch("getRolesAndPermissions");
      } catch (e) {
        commit("setError", e.response.data.error.errors);
        throw e;
      }
    },

    async register({ commit }, user) {
      try {
        const response = await api.registerUser(user);
        commit("setToken", response.headers.authorization);
        localStorage.setItem("auth", response.headers.authorization);
      } catch (error) {
        if (error.response.status === 500) {
          commit("setError", error.response.status);
        } else {
          commit("setError", error.response.data.error.errors);
        }
        throw error;
      }
    },
  },
};
