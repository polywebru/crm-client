import api from "../api";
export default {
  state: {
    userInfo: {},
    roles: [],
    permissions: [],
    isLoading: false,
    lastModified: null,
  },
  mutations: {
    setUserInfo(state, info) {
      state.userInfo = info;
    },
    setFoto(state, file) {
      state.userInfo.avatar = file;
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setLastModified(state, lastModified) {
      state.lastModified = lastModified;
    },
    setRolesAndPermissions(state, { roles, permissions }) {
      state.roles = roles;
      state.permissions = permissions;
    },
    resetProfile(state) {
      state.userInfo = {};
      state.roles = [];
      state.permissions = [];
      state.isLoading = false;
      state.lastModified = null;
    },
  },
  actions: {
    async getUserInfo({ rootState, commit, state }) {
      commit("setIsLoading", true);
      try {
        const response = await api.getInfo(
          rootState.token || localStorage.getItem("auth"),
          state.lastModified
        );
        if (response.status === 200) {
          commit("setUserInfo", response.data.data);
          commit("setLastModified", response.data.data.updated_at);
          localStorage.setItem("username", response.data.data.username);
        }
        commit("setIsLoading", false);
      } catch (error) {
        if (error.response.status >= 500) {
          commit("setError", error.response.status);
        } else {
          commit("setIsLoading", false);
        }
        throw error.response.status;
      }
    },
    async getRolesAndPermissions({ rootState, commit }) {
      try {
        const response = await api.getRolesAndPermissions(
          rootState.token || localStorage.getItem("auth")
        );
        if (response.status === 200) {
          commit("setRolesAndPermissions", response.data);
        }
      } catch (error) {
        commit("setError", error);
      }
    },
  },
  getters: {
    mainLayoutInfo: (state) => ({
      firstName: state.userInfo?.first_name,
      lastName: state.userInfo?.last_name,
      username: state.userInfo?.username,
    }),
    hasRolesAndPermissions: (state) =>
      state.roles.length && state.permissions.length,
  },
};
