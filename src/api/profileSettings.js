import baseApi from "./baseApi";
import routes from "./routes";

export default async function changeUserInfo(user, token, route) {
  return await baseApi.execute(
    routes.profileSettings(route),
    user,
    "put",
    token
  );
}
