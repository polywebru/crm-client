import api from "../api";
export default {
  actions: {
    async logout({ rootState, commit }) {
      try {
        commit("setFormPending", true);
        await api.logout(rootState.token || localStorage.getItem("auth"));
        localStorage.clear();
        commit("removeToken");
        commit("resetProfile");
        commit("resetSettings");
        commit("setFormPending", false);
      } catch (error) {
        commit("setFormPending", false);
        throw error;
      }
    },
  },
};
