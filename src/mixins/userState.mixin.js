import { mapState } from "vuex";
export default {
  data() {
    return {
      formData: {
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        gender: "",
        date_birth: "",
        faculty_id: null,
        speciality_id: null,
        study_begin_date: "",
        study_duration: "",
        skills: [],
        wishes: "",
        username: "",
      },
      specialities: [],
      faculties: {},
      study_durations: [],
    };
  },
  created() {
    if (this.USER_STATE) {
      this.formData = { ...this.USER_STATE };
    }
  },
  computed: mapState({
    USER_STATE: (state) => state.auth.user,
  }),
};
