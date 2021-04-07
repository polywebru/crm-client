import baseApi from "./baseApi";
import routes from "./routes";
let tableSettings = {};
function getQueryData(dataTablesSettings) {
  const { columns, order, start, length, search } = dataTablesSettings;
  tableSettings = {
    start,
    length,
    "search[value]": search.value,
    "search[regex]": search.regex,
  };
  setDeepParams(columns, "columns");
  setDeepParams(order, "order");
  return tableSettings;
}
function setDeepParams(param, name) {
  Object.values(param).forEach((value, index) => {
    Object.keys(value).forEach((key) => {
      if (typeof value[key] !== "object") {
        tableSettings[`${name}[${index}][${key}]`] = value[key];
      } else {
        Object.keys(value[key]).forEach((keyName) => {
          tableSettings[`${name}[${index}][${key}][${keyName}]`] =
            value[key][keyName];
        });
      }
    });
  });
}
export default {
  async getUsers(token, dataTablesSettings) {
    getQueryData(dataTablesSettings);
    return await baseApi.execute(
      routes.adminUsers,
      tableSettings,
      "get",
      token
    );
  },
  async activateUser(token, uid) {
    return await baseApi.execute(
      routes.adminUsersAction(uid, "activate"),
      null,
      "post",
      token
    );
  },
  async deActivateUser(token, uid) {
    return await baseApi.execute(
      routes.adminUsersAction(uid, "deactivate"),
      null,
      "post",
      token
    );
  },
  async changeStatus(token, uid, status) {
    return await baseApi.execute(
      routes.adminUsersAction(uid, "change-status"),
      { status },
      "post",
      token
    );
  },
  async deleteUser(token, uid) {
    return await baseApi.execute(
      routes.adminUsersAction(uid, "delete"),
      null,
      "delete",
      token
    );
  },
};
