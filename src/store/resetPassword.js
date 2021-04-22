import api from "../api";

export default {
    state: {
        email: null,
    },
    actions: {
        async forgotPassword({ commit, dispatch }, email) {
            try {
                const response = await api.forgotPassword(email);
            } catch (e) {
                commit("setError", e.response.data.error.errors);
                throw e;
            }
        },
    },
};
