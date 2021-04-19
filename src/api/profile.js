import baseApi from "./baseApi";
import routes from "./routes";

export default {
  async getInfo(token) {
    return await baseApi.execute(routes.user, null, "get", token);
  },
  async getRolesAndPermissions(token) {
    return await baseApi.execute(
      routes.rolesAndPermissions,
      null,
      "get",
      token
    );
  },
};
