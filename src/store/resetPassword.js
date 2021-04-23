import api from "../api";

export default {
    state: {
        token: null,
        password: null,
        password_confirmation: null,
    },
    actions: {
        async resetPassword({commit}, data) {
            try {
                await api.resetPassword(data);
            } catch (e) {
                commit("setError", e.response.data.error.errors);
                throw e;
            }
        },
    },
};
