import baseApi from "./baseApi";
import routes from "./routes";

export default {
  async getAvatar(token) {
    return await baseApi.execute(routes.userAvatar, null, "get", token);
  },
  async uploadAvatar(token, avatar) {
    return await baseApi.execute(routes.userAvatar, avatar, "post", token);
  },
  async deleteAvatar(token) {
    return await baseApi.execute(routes.userAvatar, null, "delete", token);
  },
};
