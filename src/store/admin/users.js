import api from "@/api";
import { cloneDeep } from "lodash";
const usersTable = {
  columns: [
    {
      data: "id",
      name: "",
      orderable: true,
      searchable: true,
      search: {
        value: "",
        regex: "",
      },
    },
    {
      data: "Логин",
      name: "username",
      orderable: true,
      searchable: true,
      search: {
        value: "",
        regex: "",
      },
    },
    {
      data: "Имя",
      name: "first_name",
      orderable: true,
      searchable: true,
      search: {
        value: "",
        regex: "",
      },
    },
    {
      data: "Фамилия",
      name: "last_name",
      orderable: true,
      searchable: true,
      search: {
        value: "",
        regex: "",
      },
    },
    {
      data: "Email",
      name: "email",
      orderable: true,
      searchable: true,
      search: {
        value: "",
        regex: "",
      },
    },
    {
      data: "Телефон",
      name: "phone",
      orderable: true,
      searchable: true,
      search: {
        value: "",
        regex: "",
      },
    },
    {
      data: "Статус",
      name: "status",
      orderable: true,
      searchable: true,
      search: {
        value: "",
        regex: "",
      },
    },
    {
      data: "Зарегистрирован",
      name: "created_at",
      orderable: true,
      searchable: true,
      search: {
        value: "",
        regex: "",
      },
    },
  ],
  order: [
    {
      column: 0,
      dir: "asc",
    },
  ],
  start: 0,
  length: 25,
  search: {
    value: "",
    regex: false,
  },
};
export default {
  namespaced: true,
  state: {
    users: [],

    tableSettings: cloneDeep(usersTable),
    recordsFiltered: null,
    page: 1,
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    updateUsers(state, user) {
      const userIndex = state.users.findIndex((el) => el.id === user.id);
      state.users.splice(userIndex, 1, user);
    },
    setPerPage(state, perPage) {
      state.tableSettings.length = perPage;
    },
    setStartPage(state, startPage) {
      state.tableSettings.start = startPage;
    },
    setRecordsFiltered(state, recordsFiltered) {
      state.recordsFiltered = recordsFiltered;
    },
    setOrderColumn(state, column) {
      state.tableSettings.order[0].column = column;
    },
    setOrderDirection(state, direction) {
      state.tableSettings.order[0].dir = direction;
    },
    setColumnSearchValue(state, { searchValue, columnName }) {
      state.tableSettings.columns.find(
        (col) => col.name === columnName
      ).search.value = searchValue;
    },
    setGlobalSearchValue(state, searchValue) {
      state.tableSettings.search.value = searchValue;
    },
    setPage(state, page) {
      state.page = page;
    },
    resetTableSettings(state) {
      state.tableSettings = cloneDeep(usersTable);
    },
  },
  actions: {
    async getUsers({ commit, rootState, state }) {
      try {
        const response = await api.getAdminUsers(
          rootState.token,
          state.tableSettings
        );
        commit("setUsers", response.data.data);
        commit("setRecordsFiltered", response.data.recordsFiltered);
      } catch (error) {
        throw error.response.status;
      }
    },
    async activateUser({ commit, rootState }, uid) {
      try {
        const response = await api.activate(rootState.token, uid);
        commit("updateUsers", response.data.data);
      } catch (error) {
        console.log(error);
      }
    },
    async deActivateUser({ commit, rootState }, uid) {
      try {
        const response = await api.deActivate(rootState.token, uid);
        commit("updateUsers", response.data.data);
      } catch (error) {}
    },
    async deleteUser({ rootState, dispatch }, uid) {
      try {
        await api.delete(rootState.token, uid, status);
        await dispatch("getUsers");
      } catch (error) {}
    },
    async changeStatus({ commit, rootState }, { id: uid, status }) {
      try {
        const response = await api.changeStatus(rootState.token, uid, status);
        commit("updateUsers", response.data.data);
      } catch (error) {}
    },
  },
  getters: {
    clientUsers: (state) => {
      return state.users.map((user) => ({
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        createdAt: user.created_at,
        email: user.email,
        phone: user.phone,
        isActive: user.is_active,
        status: user.status,
        username: user.username,
        isActivating: false,
        isDeleting: false,
        isChanging: false,
      }));
    },
  },
};
