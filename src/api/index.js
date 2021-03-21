import auth from "./auth";
import settings from "./facsAndSpecs";
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
};
