import auth from "./auth";
export default {
  async login(user) {
    const resp = await auth.login(user);
    return resp;
  },
};
