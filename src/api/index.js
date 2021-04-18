import auth from "./auth";
import settings from "./facsAndSpecs";
import profile from "./profile";
import logout from "./logout";
import admin from "./admin";
import usersProfiles from "./viewUsersProfile";
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
  async getAdminUsers(token, dataTablesSettings = null) {
    return await admin.getUsers(token, dataTablesSettings);
  },
  async activate(token, uid) {
    return await admin.activateUser(token, uid);
  },
  async deActivate(token, uid) {
    return await admin.deActivateUser(token, uid);
  },
  async delete(token, uid) {
    return await admin.deleteUser(token, uid);
  },
  async changeStatus(token, uid, status) {
    return await admin.changeStatus(token, uid, status);
  },
  async viewProfiles(token, username) {
    return await usersProfiles.viewUsersProfile(token, username);
  },
};
