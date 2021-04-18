import baseApi from "./baseApi";
import routes from "./routes";
export default {
  async viewUsersProfile(token, username) {
    return await baseApi.execute(
      routes.viewUsersProfile(username),
      null,
      "get",
      token
    );
  },
};
