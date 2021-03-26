import baseApi from "./baseApi";
import routes from "./routes";

export default {
  async login(user) {
    return await baseApi.execute(routes.login, user, "post");
  },
  async registerUser(user) {
    return await baseApi.execute(routes.register, user, "post");
  },
};
