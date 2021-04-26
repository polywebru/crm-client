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
    resetSettings(state) {
      state.faculties = null;
      state.specialities = null;
      state.duration = null;
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
        commit("setDuration", response.data.data.user_study_durations);
      } catch (error) {
        commit("setError", error);
      }
    },
  },
  getters: {
    facultiesNames: (state) => {
      return state.faculties?.map((faculty) => faculty.name);
    },
    specialitiesNames: (state) => {
      return state.specialities?.map(
        (speciality) =>
          `${speciality.code}: ${speciality.profile || speciality.name}`
      );
    },
    studyDurationNames: (state) => {
      return state.duration && Object.values(state.duration);
    },
  },
};
