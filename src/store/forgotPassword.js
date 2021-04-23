import api from "../api";

export default {
    state: {
        email: null,
    },
    actions: {
        async forgotPassword({commit}, email) {
            try {
                await api.forgotPassword(email);
            } catch (e) {
                commit("setError", e.response.data.error.errors);
                throw e;
            }
        },
    },
};
