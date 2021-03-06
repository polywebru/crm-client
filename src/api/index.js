import auth from "./auth";
import settings from "./facsAndSpecs";
import profile from "./profile";
import logout from "./logout";
import admin from "./admin";
import usersProfiles from "./viewUsersProfile";
import changeProfileInfo from "./profileSettings";
import userAvatar from "./userAvatar";

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
  async getInfo(token) {
    return await profile.getInfo(token);
  },
  async getRolesAndPermissions(token) {
    return await profile.getRolesAndPermissions(token);
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
  async changeUserInfo(user, token, route) {
    return await changeProfileInfo(user, token, route);
  },
    async uploadAvatar(token, avatar) {
        return await userAvatar.uploadAvatar(token, avatar);
    },
    async deleteAvatar(token, avatar) {
        return await userAvatar.deleteAvatar(token, avatar);
    }
};
