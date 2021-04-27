import api from "../api";

export default {
    state: {
        avatar: null,
    },
    mutations: {
    },
    actions: {
        async uploadAvatar({commit, rootState}, avatar) {
            try {
                const response = await api.uploadAvatar(rootState.token, avatar);
            } catch (e) {
                commit("setError", e.response.data.error.errors);
                throw e;
            }
        },
        async deleteAvatar({commit, rootState}, avatar) {
            try {
                const response = await api.deleteAvatar(rootState.token, avatar);
            } catch (e) {
                commit("setError", e.response.data.error.errors);
                throw e;
            }
        },
    },
};
