import api from "../api";

export default {
  state: {
    faculties: null,
    specialities: null,
    duration: null,
  },
  mutations: {
    setFaculties(state, faculties) {
      state.faculties = faculties;
    },
    setSpecialities(state, specialities) {
      state.specialities = specialities;
    },
    setDuration(state, duration) {
      state.duration = duration;
    },
  },
  actions: {
    async getFaculties({ commit }) {
      try {
        const response = await api.getFaculties();
        commit("setFaculties", response.data.data);
      } catch (error) {
        commit("setError", error);
      }
    },
    async getSpecialityById({ commit }, id) {
      try {
        const response = await api.getSpecialityById(id);
        commit("setSpecialities", response.data.data);
      } catch (error) {
        commit("setError", error);
      }
    },
    async getDuration({ commit }) {
      try {
        const response = await api.getDuration();
        commit("setDuration", response.data.data.study_durations);
      } catch (error) {
        commit("setError", error);
      }
    },
  },
};
