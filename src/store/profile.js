import api from "../api";
import { format } from "date-fns";
export default {
  state: {
    userInfo: {},
    roles: [],
    permissions: [],
    isLoading: false,
    infoChanging: false,
  },
  mutations: {
    setUserInfo(state, info) {
      state.userInfo = info;
    },
    setProfileAvatar(state, avatar) {
      state.userInfo = { ...state.userInfo, avatar };
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
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
    },
    changeUserInfo(state, { type, data }) {
      state.userInfo[type] = data;
    },
    setInfoChanging(state, infoChanging) {
      state.infoChanging = infoChanging;
    },
    removeLink(state, index) {
      state.userInfo.links.splice(index, 1);
    },
    removeSkill(state, index) {
      state.userInfo.skills.splice(index, 1);
    },
  },
  actions: {
    async getUserInfo(
      { rootState, commit },
      { isFirstView = true, username = null }
    ) {
      commit("setIsLoading", true);
      try {
        const response =
          // waiting for response after auth/register
          (isFirstView && (await api.getInfo(rootState.token))) ||
          // or waiting response after any query
          (await api.viewProfiles(rootState.token, username));
        if (response.status === 200) {
          commit("setInActive", false);

          commit("setUserInfo", response.data.data);
          if (isFirstView) {
            commit("setAvatar", response.data.data.avatar);
            commit(
              "setFullName",
              `${response.data.data.first_name} ${response.data.data.last_name}`
            );
            commit("setUsername", response.data.data.username);
            localStorage.setItem(
              "fullName",
              `${response.data.data.first_name} ${response.data.data.last_name}`
            );
            localStorage.setItem("username", response.data.data.username);
            localStorage.setItem(
              "avatar",
              JSON.stringify(response.data.data.avatar)
            );
          }
        }
        commit("setIsLoading", false);
      } catch (error) {
        if (error.response.status >= 500) {
          commit("setError", error.response.status);
        } else if (error.response.data.error.code === "403.inactive") {
          commit("setInActive", true);

          commit("setUserInfo", error.response.data.user);
          commit(
            "setFullName",
            `${error.response.data.user.first_name} ${error.response.data.user.last_name}`
          );
          commit("setUsername", error.response.data.user.username);
          localStorage.setItem(
            "fullName",
            `${error.response.data.user.first_name} ${error.response.data.user.last_name}`
          );
          localStorage.setItem("username", error.response.data.user.username);
        }
        commit("setIsLoading", false);
        if (error.response.data.error.code !== "403.inactive")
          throw error.response.status;
      }
    },
    async getRolesAndPermissions({ rootState, commit }) {
      try {
        const response = await api.getRolesAndPermissions(rootState.token);
        if (response.status === 200) {
          commit("setRolesAndPermissions", response.data);
        }
      } catch (error) {
        commit("setError", error);
      }
    },
    async changeUserInfo({ state, commit, rootState }, route) {
      try {
        commit("setInfoChanging", true);
        const response = await api.changeUserInfo(
          state.userInfo,
          rootState.token,
          route
        );
        if (response.status === 200) {
          commit("setUserInfo", response.data.data);
          commit("removeErrors");
          commit(
            "setFullName",
            `${response.data.data.first_name} ${response.data.data.last_name}`
          );
          commit("setUsername", response.data.data.username);
        }
        commit("setInfoChanging", false);
      } catch (error) {
        commit("setInfoChanging", false);
        if (error.response.status === 400) {
          commit("setError", error.response.data.error.errors);
        }
        throw error.response.status;
      }
    },
    async changeUserPassword(
      { rootState, commit },
      { oldPassword, newPassword, confirmPassword }
    ) {
      try {
        commit("setInfoChanging", true);
        await api.changeUserInfo(
          {
            old_password: oldPassword,
            password: newPassword,
            password_confirmation: confirmPassword,
          },
          rootState.token,
          "password"
        );
        commit("setInfoChanging", false);
        commit("removeErrors");
      } catch (error) {
        commit("setInfoChanging", false);
        if (error.response.status === 400) {
          commit("setError", error.response.data.error.errors);
        }
        throw error.response.status;
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
    hasAdminRole: (state) =>
      !!state.roles.find((role) => role.name === "admin"),
    getUserInfo: (state) => {
      const formatUserInfo = { ...state.userInfo };
      if (Object.keys(formatUserInfo).length) {
        formatUserInfo.date_birth = format(
          new Date(formatUserInfo.date_birth),
          "dd.MM.yyyy"
        );
        formatUserInfo.gender =
          formatUserInfo.gender === "male"
            ? "Мужской"
            : formatUserInfo.gender === "female"
            ? "Женский"
            : "";
        return formatUserInfo;
      }
      return {};
    },
  },
};
