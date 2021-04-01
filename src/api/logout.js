import baseApi from "./baseApi";
import routes from "./routes";
export default async function(token) {
  return await baseApi.execute(routes.logout, null, "post", token);
}
