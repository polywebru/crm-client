const mainPrefix = "api/v1/";
const adminPrefix = "api/v1/admin/";
export default {
  login: "login",
  register: "register",
  logout: "logout",
  settings: `${mainPrefix}settings`,
  faculties: `${mainPrefix}faculties`,
  specialities: `${mainPrefix}specialities`,
  user: `${mainPrefix}user`,
  specialitiesById(id) {
    return this.faculties + id + "specialities";
  },
  rolesAndPermissions: `${mainPrefix}user/roles-and-permissions`,
  adminUsers: `${adminPrefix}users`,

  adminUsersAction(uid, action) {
    return `${adminPrefix}users/${uid}/${action}`;
  },
  viewUsersProfile(username) {
    return `${mainPrefix}users/${username}`;
  },
};
