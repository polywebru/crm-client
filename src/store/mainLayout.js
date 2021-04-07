export default {
  namespaced: true,
  state: {},
  getters: {
    links: (state) => (isHeader) => {
      return (
        (isHeader && state.links.slice(0, 3)) ||
        state.links.slice(3, state.links.length)
      );
    },
  },
};
