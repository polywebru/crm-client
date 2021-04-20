<template>
  <div class="additional-info">
    <rise-loader
      v-if="isLoading"
      class="rise-loader"
      :size="'15px'"
      :loading="true"
      :color="'#5688f0'"
    ></rise-loader>
    <div class="additional-text-fields" v-else>
      <div class="field">
        <label for="faculty">Факультет</label>
        <v-select
          outlined
          id="faculty"
          :value="currentFaculty"
          :items="facultiesNames"
          @change="changeFaculty"
          class="custom-input settings__input"
        ></v-select>
      </div>
      <div class="field">
        <label for="speciality">Специальность</label>
        <v-select
          outlined
          id="speciality"
          :value="currentSpeciality"
          :items="specialitiesNames"
          @change="changeSpeciality"
          class="custom-input settings__input"
        ></v-select>
      </div>
      <div class="field">
        <label for="study_begin_date">Начало обучения</label>
        <date-picker
          :date="studyBeginDate"
          @changeDate="
            changeUserInfo({ type: 'study_begin_date', data: $event })
          "
          id="study_begin_date"
        ></date-picker>
      </div>
      <div class="field">
        <label for="study_duration">Продолжительность обучения</label>
        <v-select
          outlined
          id="study_duration"
          :value="currentDuration"
          :items="studyDurationNames || []"
          @change="changeStudyDuration"
          class="custom-input settings__input"
        ></v-select>
      </div>
      <button
        class="settings__change"
        type="submit"
        @click.prevent="$emit('changeInfo', 'additional-info')"
      >
        <span> Изменить</span>
      </button>
    </div>
  </div>
</template>
<script>
import RiseLoader from "vue-spinner/src/RiseLoader.vue";
import DatePicker from "@/components/DatePicker.vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { format } from "date-fns";
export default {
  name: "Additional",
  metaInfo: {
    title: "Дополнительная информация - PolyWeb",
  },

  components: { DatePicker, RiseLoader },
  data() {
    return {
      isLoading: false,
    };
  },
  async created() {
    try {
      this.isLoading = true;
      if (Object.keys(this.getUserInfo).length) {
        !this.FACULTIES && (await this.getFaculties());
        !this.DURATION && (await this.getDuration());
        this.currentFaculty &&
          !this.SPECIALITIES &&
          (await this.getSpecialityById(this.getUserInfo.faculty.id));
        this.isLoading = false;
      }
    } catch (error) {
      this.isLoading = false;
    }
  },
  computed: {
    currentFaculty() {
      return this.getUserInfo.faculty && this.getUserInfo.faculty.name;
    },
    currentSpeciality() {
      const speciality = this.getUserInfo.speciality;
      return (
        speciality &&
        `${speciality.code}: ${speciality.profile || speciality.name}`
      );
    },
    currentDuration() {
      if (this.DURATION && this.getUserInfo.study_duration) {
        return this.DURATION[this.getUserInfo.study_duration];
      }
    },
    studyBeginDate() {
      return (
        this.getUserInfo.study_begin_date &&
        format(new Date(this.getUserInfo.study_begin_date), "dd.MM.yyyy")
      );
    },
    ...mapGetters([
      "getUserInfo",
      "facultiesNames",
      "specialitiesNames",
      "studyDurationNames",
    ]),
    ...mapState({
      FACULTIES: (state) => state.universityInfo.faculties,
      DURATION: (state) => state.universityInfo.duration,
      SPECIALITIES: (state) => state.universityInfo.specialities,
    }),
  },

  methods: {
    async changeFaculty(faculty) {
      const facultyId = this.FACULTIES.find((fac) => fac.name === faculty).id;
      try {
        await this.getSpecialityById(facultyId);
      } catch (error) {}
    },
    changeStudyDuration(studyDuration) {
      const duration = Object.keys(this.DURATION).find(
        (key) => this.DURATION[key] === studyDuration
      );
      this.changeUserInfo({ type: "study_duration", data: duration });
    },
    changeSpeciality(speciality) {
      const specialityId = this.SPECIALITIES.find(
        (spec) =>
          `${spec.code}: ${spec?.name}` === speciality ||
          `${spec.code}: ${spec?.profile}` === speciality
      ).id;
      this.changeUserInfo({ type: "speciality_id", data: specialityId });
    },
    ...mapActions(["getFaculties", "getSpecialityById", "getDuration"]),
    ...mapMutations(["changeUserInfo", "setIsLoading"]),
  },
};
</script>
<style lang="scss" scoped>
.additional-info {
  height: 100%;
  .rise-loader {
    left: 60%;
    @media (max-width: 970px) {
      top: 50% !important;
      left: 50% !important;
    }
  }
}
</style>