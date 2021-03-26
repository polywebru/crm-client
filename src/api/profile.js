import baseApi from "./baseApi";
import routes from "./routes";

export default {
  async getInfo(token, lastModified) {
    return await baseApi.execute(routes.user, null, "get", token, lastModified);
  },
  async getRolesAndPermissions(token, lastModified) {
    return await baseApi.execute(
      routes.rolesAndPermissions,
      null,
      "get",
      token,
      lastModified
    );
  },
};
