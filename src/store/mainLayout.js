export default {
  namespaced: true,
  state: {
    links: [
      { title: "Проекты", path: "/porjects" },
      { title: "Команды", path: "/teams" },
      { title: "Задачи", path: "/tasks" },
      { title: "Профиль", path: `/user/${localStorage.getItem("username")}` },
      { title: "Настройки", path: "/settings" },
      { title: "Выход", path: "/" },
    ],
  },
  getters: {
    links: (state) => (isHeader) =>
      (isHeader && state.links.slice(0, 3)) ||
      state.links.slice(3, state.links.length),
  },
};
