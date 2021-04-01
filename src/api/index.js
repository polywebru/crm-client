import auth from "./auth";
import settings from "./facsAndSpecs";
import profile from "./profile";
import logout from "./logout";
export default {
  async login(user) {
    return await auth.login(user);
  },
  async getFaculties() {
    return await settings.getFaculties();
  },
  async getSpecialityById(id) {
    return await settings.getSpecialityById(id);
  },
  async getDuration() {
    return await settings.getDuration();
  },
  async registerUser(user) {
    return await auth.registerUser(user);
  },
  async getInfo(token, lastModified = null) {
    return await profile.getInfo(token, lastModified);
  },
  async getRolesAndPermissions(token, lastModified = null) {
    return await profile.getRolesAndPermissions(token, lastModified);
  },
  async logout(token) {
    return await logout(token);
  },
};
