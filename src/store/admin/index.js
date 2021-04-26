import users from "./users";
export default {
  state: {
    hasAccess: true,
    adminLoading: false,
  },
  mutations: {
    setHasAccess(state, hasAccess) {
      state.hasAccess = hasAccess;
    },
    resetHasAccess(state) {
      state.hasAccess = true;
    },
    setAdminLoading(state, adminLoading) {
      state.adminLoading = adminLoading;
    },
  },
  modules: {
    users,
  },
};
