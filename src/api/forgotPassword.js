import baseApi from "./baseApi";
import routes from "./routes";

export default {
    async forgotPassword(email) {
        return await baseApi.execute(routes.forgotPassword, email, "post");
    },
};