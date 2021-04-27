import api from "../api";
export default {
  actions: {
    async logout({ rootState, commit }) {
      try {
        commit("setFormPending", true);
        await api.logout(rootState.token );
        localStorage.clear();
        commit("removeToken");
        commit("resetProfile");
        commit("resetSettings");
        commit("removeErrors");
        commit("resetHasAccess");
        commit("setFormPending", false);
      } catch (error) {
        commit("setFormPending", false);
        throw error;
      }
    },
  },
};
