<template>
  <div class="first-page d-flex flex-column mt-6">
    <div class="form-row">
      <div class="form-item half">
        <label for="faculty">Факультет</label>
        <v-select
          v-model="facultyName"
          outlined
          @change="getSpecialities"
          background-color="#fff"
          placeholder="Факультет"
          class="custom-input mt-1"
          :class="{ invalid: facultyInvalid }"
          hide-details
          id="faculty"
          :items="facultyNames"
        ></v-select>
      </div>
      <div class="form-item half">
        <label for="specialty">Направление</label>
        <v-select
          outlined
          v-model="specialityName"
          @change="setSpeciality"
          background-color="#fff"
          placeholder="Направление"
          :disabled="!facultyName"
          hide-details
          class="custom-input mt-1"
          :class="{ disabled: !facultyName, invalid: specialityInvalid }"
          id="specialty"
          :items="specialityNames"
        ></v-select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-item half">
        <date-picker
          :isInvalid="startStudyingInvalid"
          :nameDatePicker="'Начало обучения'"
          :isBirthdate="false"
          @selectDate="setStartStudying"
        />
      </div>
      <div class="form-item half">
        <label for="studying-duration">Продолжительность обучения</label>
        <v-select
          v-model="durationName"
          outlined
          @change="setDuration"
          background-color="#fff"
          hide-details
          placeholder="Сколько учиться?"
          :class="{ invalid: durationInvalid }"
          class="custom-input mt-1"
          id="studying-duration"
          :items="durations"
        ></v-select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-item full">
        <skills @updateSkills="updateSkills" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-item full">
        <label for="wishes">Пожелания</label>
        <v-textarea
          class="custom-input custom-textarea"
          v-model="formData.wishes"
          no-resize
          outlined
          :class="{ invalid: wishesInvalid }"
          :counter="255"
          background-color="#fff"
          id="wishes"
          placeholder="Что бы вы хотели делать у нас?"
        ></v-textarea>
      </div>
    </div>
    <v-row class="mt-2 button-row">
      <v-btn class="btn btn-login pl-10 pr-10" @click="backHandler"
        >Вернуться</v-btn
      >
      <v-btn
        type="submit"
        class="btn btn-login pl-5 pr-5"
        @click.prevent="registerHandler"
      >
        Подать заявку
      </v-btn>
    </v-row>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import { mapActions, mapState } from "vuex";

import DatePicker from "../DatePicker.vue";
import Skills from "../Skills.vue";

import userStateMixin from "../../mixins/userState.mixin";

export default {
  components: { DatePicker, Skills },
  mixins: [validationMixin, userStateMixin],
  data() {
    return {
      page: 2,
      facultyName: "",
      specialityName: "",
      speciality: null,
      durationName: "",
    };
  },
  validations: {
    formData: {
      faculty_id: { required },
      speciality_id: { required },
      study_begin_date: { required },
      study_duration: { required },
      wishes: { maxLength: maxLength(255) },
    },
  },
  async created() {
    if (!this.FACULTIES) {
      this.$emit("setLoading", true);
      await this.getFaculties();
      await this.getDuration();
      this.$emit("setLoading", false);
    }
    this.setFacultyName();
    this.setSpecialityName();
    this.setDurationName();
  },
  computed: {
    facultyInvalid() {
      return (
        this.$v.formData.faculty_id.$invalid &&
        this.$v.formData.faculty_id.$dirty
      );
    },
    specialityInvalid() {
      return (
        this.$v.formData.speciality_id.$invalid &&
        this.$v.formData.speciality_id.$dirty
      );
    },
    startStudyingInvalid() {
      return (
        this.$v.formData.study_begin_date.$invalid &&
        this.$v.formData.study_begin_date.$dirty
      );
    },
    durationInvalid() {
      return (
        this.$v.formData.study_duration.$invalid &&
        this.$v.formData.study_duration.$dirty
      );
    },
    wishesInvalid() {
      return this.$v.formData.wishes.$invalid && this.$v.formData.wishes.$dirty;
    },
    facultyNames() {
      if (this.faculties) {
        return Object.keys(this.faculties).map(
          (key) => this.faculties[key].name
        );
      }
    },
    specialityNames() {
      if (this.specialities?.length) {
        return Object.keys(this.specialities).map((key) => {
          if (this.specialities[key]?.profile) {
            return `${this.specialities[key]?.code}:${this.specialities[key]?.profile}`;
          }
          return `${this.specialities[key]?.code}:${this.specialities[key]?.name}`;
        });
      }
    },
    durations() {
      if (this.DURATION) {
        this.study_durations = { ...this.DURATION };
        return Object.values(this.study_durations);
      }
    },
    ...mapState({
      FACULTIES: (state) => state.settings.faculties,
      SPECIALITIES: (state) => state.settings.specialities,
      DURATION: (state) => state.settings.duration,
    }),
  },
  methods: {
    ...mapActions(["getFaculties", "getSpecialityById", "getDuration"]),
    setFacultyName() {
      if (this.FACULTIES) {
        this.faculties = [...this.FACULTIES];
        this.facultyName = this.faculties?.find(
          (faculty) => faculty.id === this.formData.faculty_id
        )?.name;
      }
    },
    setSpecialityName() {
      if (this.SPECIALITIES) {
        this.specialities = [...this.SPECIALITIES];
        this.speciality = this.specialities?.find(
          (speciality) => speciality.id === this.formData.speciality_id
        );
        if (this.speciality?.profile) {
          this.specialityName = `${this.speciality?.code}:${this.speciality?.profile}`;
        } else {
          this.specialityName = `${this.speciality?.code}:${this.speciality?.name}`;
        }
      }
    },
    setDurationName() {
      if (this.DURATION) {
        this.study_durations = { ...this.DURATION };
        const durationKey = Object.keys(this.study_durations)
          .filter((duration) => duration === this.formData.study_duration)
          .toString();
        this.durationName = this.study_durations[durationKey];
      }
    },
    setStartStudying(date) {
      this.formData.study_begin_date = date;
    },
    registerHandler() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit("register", this.formData);
      }
    },
    backHandler() {
      this.$emit("updateUserState", this.formData, this.page - 1);
    },
    updateSkills(skills) {
      this.formData.skills = [...skills];
      this.$emit("updateUserState", this.formData, this.page);
    },
    async getSpecialities() {
      this.formData.faculty_id = Object.values(this.faculties).find(
        (value) => value.name === this.facultyName
      ).id;
      this.$emit("updateUserState", this.formData, this.page);
      this.$emit("setLoading", true);
      await this.getSpecialityById(this.formData.faculty_id);
      this.$emit("setLoading", false);
      this.specialities = this.SPECIALITIES;
    },
    setSpeciality() {
      const selectedProfile = this.specialityName.slice(
        this.specialityName.indexOf(":") + 1
      );
      this.formData.speciality_id = Object.values(this.specialities).find(
        (value) =>
          value.profile === selectedProfile || value.name === selectedProfile
      )?.id;
      this.$emit("updateUserState", this.formData, this.page);
    },
    setDuration() {
      this.formData.study_duration = Object.keys(this.study_durations)
        .find((key) => this.study_durations[key] === this.durationName)
        .toString();
      this.$emit("updateUserState", this.formData, this.page);
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-input {
  @media (max-width: 1140px) {
    max-width: 256px;
  }
}
.form-row:nth-child(3) {
  @media (max-width: 1140px) {
    margin-bottom: 0 !important;
  }
}
</style>