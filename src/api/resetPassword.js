import baseApi from "./baseApi";
import routes from "./routes";

export default {
    async resetPassword(data) {
        return await baseApi.execute(routes.resetPassword, data, "post");
    },
};