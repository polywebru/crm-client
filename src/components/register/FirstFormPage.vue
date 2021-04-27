<template>
  <div class="first-page d-flex flex-column mt-6">
    <div class="form-row">
      <div class="form-item full">
        <label for="secondName" class="required-line">Фамилия</label>
        <v-text-field
          v-model.trim="formData.last_name"
          placeholder="Фамилия"
          background-color="#fff"
          single-line
          append-icon="mdi-account-box"
          required
          outlined
          type="text"
          maxLength="255"
          :counter="255"
          class="custom-input mt-1"
          id="secondName"
          :class="{ invalid: lastNameInvalid }"
        ></v-text-field>
      </div>
    </div>
    <div class="form-row">
      <div class="form-item full">
        <label for="firstName" class="required-line">Имя</label>
        <v-text-field
          v-model.trim="formData.first_name"
          placeholder="Имя"
          background-color="#fff"
          single-line
          outlined
          append-icon="mdi-account-box-outline"
          type="text"
          required
          maxLength="255"
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
          maxLength="255"
          :counter="255"
          append-icon="mdi-account-box-multiple"
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
          class="custom-input mt-1"
          append-icon="mdi-calendar-account-outline"
          v-mask="'##.##.####'"
          background-color="#fff"
          :error-messages="invalidDate"
          :class="{ invalid: invalidDate }"
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
import { validationMixin } from "vuelidate";
import formDataMixin from "@/mixins/formData.mixin";
import { required, maxLength } from "vuelidate/lib/validators";
import { mapState } from "vuex";
import validateDate from "validate-date";
export default {
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
      dateInvalid: false,
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
    invalidDate() {
      if (this.dateInvalid) {
        return ["Неверный формат даты"];
      }
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
      this.dateInvalid =
        !validateDate(this.formatForServerBirthDate, "boolean", "yyyy-mm-dd") &&
        this.formatForServerBirthDate;
      if (!this.$v.$invalid && !this.dateInvalid) {
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
.required-line {
  position: relative;
  &::after {
    position: absolute;
    content: "*";
    top: 50%;
    transform: translateY(-50%);
    left: 100%;
    color: rgb(200, 0, 0);
  }
}
</style>