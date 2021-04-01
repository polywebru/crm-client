<template>
  <div class="first-page d-flex flex-column mt-6">
    <div class="form-row">
      <div class="form-item full">
        <label for="secondName">Фамилия</label>
        <v-text-field
          v-model.trim="formData.last_name"
          placeholder="Фамилия"
          background-color="#fff"
          single-line
          required
          outlined
          type="text"
          :counter="255"
          class="custom-input mt-1"
          id="secondName"
          :class="{ invalid: lastNameInvalid }"
        ></v-text-field>
      </div>
    </div>
    <div class="form-row">
      <div class="form-item full">
        <label for="firstName">Имя</label>
        <v-text-field
          v-model.trim="formData.first_name"
          placeholder="Имя"
          background-color="#fff"
          single-line
          outlined
          type="text"
          required
          :counter="255"
          class="custom-input mt-1"
          :class="{ invalid: firstNameInvalid }"
          id="firstName"
        ></v-text-field>
      </div>
    </div>
    <div class="form-row">
      <div class="form-item full">
        <label for="lastName">Отчество</label>
        <v-text-field
          v-model.trim="formData.middle_name"
          placeholder="Отчество"
          background-color="#fff"
          outlined
          :counter="255"
          type="text"
          class="custom-input mt-1"
          :class="{ invalid: middleNameInvalid }"
          id="lastName"
        ></v-text-field>
      </div>
    </div>
    <div class="form-row">
      <div class="form-item half">
        <label for="gender">Пол</label>
        <v-select
          v-model="genderType"
          outlined
          @change="setGender"
          background-color="#fff"
          placeholder="Пол"
          class="custom-input mt-1"
          id="gender"
          :items="['Мужской', 'Женский']"
        ></v-select>
      </div>
      <div class="form-item half">
        <label for="date">Дата рождения</label>
        <v-text-field
          id="date"
          v-model="birthDate"
          class="custom-input mt-1 datepicker"
          v-mask="'##.##.####'"
          background-color="#fff"
          :error-messages="dateBirthError && [dateBirthError]"
          :class="{ invalid: dateBirthError }"
          outlined
          placeholder="Дата рождения"
        ></v-text-field>
      </div>
    </div>
    <v-row class="d-flex justify-center mt-4">
      <v-btn
        type="submit"
        class="btn btn-login"
        @click.prevent="continueHandler"
        >Продолжить</v-btn
      >
    </v-row>
  </div>
</template>
<script>
import DatePicker from "../DatePicker.vue";
import { validationMixin } from "vuelidate";
import formDataMixin from "@/mixins/formData.mixin";
import { required, maxLength } from "vuelidate/lib/validators";
import { mapState } from "vuex";
export default {
  components: { DatePicker },
  mixins: [validationMixin, formDataMixin],
  props: {
    dateBirthError: {
      type: String,
    },
  },
  data() {
    return {
      page: 0,
      genderType: "",
      birthDate: "",
    };
  },
  validations: {
    formData: {
      first_name: { required, maxLength: maxLength(255) },
      middle_name: { maxLength: maxLength(255) },
      last_name: { required, maxLength: maxLength(255) },
    },
  },
  created() {
    this.genderType = this.getGenderType;
    this.birthDate = this.formatForClientBirthDate;
  },
  computed: {
    firstNameInvalid() {
      return (
        this.$v.formData.first_name.$invalid &&
        this.$v.formData.first_name.$dirty
      );
    },
    middleNameInvalid() {
      return (
        this.$v.formData.middle_name.$invalid &&
        this.$v.formData.middle_name.$dirty
      );
    },
    lastNameInvalid() {
      return (
        this.$v.formData.last_name.$invalid && this.$v.formData.last_name.$dirty
      );
    },
    formatForServerBirthDate() {
      return this.birthDate?.split(".").reverse().join("-");
    },
    formatForClientBirthDate() {
      return this.USER_BIRTHDATE?.split("-").reverse().join(".");
    },
    getGenderType() {
      return this.USER_GENDER === "male"
        ? "Мужской"
        : this.USER_GENDER === "female"
        ? "Женский"
        : "";
    },
    ...mapState({
      USER_GENDER: (state) => state.auth.user?.gender,
      USER_BIRTHDATE: (state) => state.auth.user?.date_birth,
    }),
  },
  methods: {
    setGender() {
      this.formData.gender = this.genderType === "Мужской" ? "male" : "female";
    },
    continueHandler() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.formData.date_birth = this.formatForServerBirthDate;
        this.$emit("updateUserState", this.formData, this.page + 1);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.first-page {
  @media (min-width: 1141px) {
    width: 400px;
  }
}
</style>