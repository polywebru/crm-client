import baseApi from "./baseApi";
export default {
  apiRoutes: {
    login: "login",
    register: "register",
    logout: "logout",
  },
  async login(user) {
    return await baseApi.execute(this.apiRoutes.login, user, "post");
  },
};
