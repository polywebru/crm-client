import api from "../api";

export default {
  state: {
    avatar: JSON.parse(localStorage.getItem("avatar")) || null,
  },
  mutations: {
    setAvatar(state, avatar) {
      state.avatar = avatar;
    },
  },
  actions: {
    async uploadAvatar({ commit, rootState }, avatar) {
      try {
        const response = await api.uploadAvatar(rootState.token, avatar);
        commit("setProfileAvatar", response.data);
        commit("setAvatar", response.data);
        localStorage.setItem("avatar", JSON.stringify(response.data));
      } catch (e) {
        throw e.response.status;
      }
    },
    async deleteAvatar({ rootState, commit }) {
      try {
        await api.deleteAvatar(rootState.token);
        commit("setProfileAvatar", null);
        commit("setAvatar", null);
        localStorage.removeItem("avatar");
      } catch (e) {
        throw e.response.status;
      }
    },
  },
};
