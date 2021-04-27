import baseApi from "./baseApi";
import routes from "./routes";

export default {
    async uploadAvatar(token, avatar) {
        return await baseApi.execute(routes.userAvatar, avatar, "post", token);
    },
    async deleteAvatar(token, avatar) {
        return await baseApi.execute(routes.userAvatar, avatar, "delete", token);
    }
}