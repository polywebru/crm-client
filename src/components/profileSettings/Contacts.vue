<template>
  <div class="contact-info">
    <div class="contact-text-fields">
      <div class="field">
        <label for="phone">Телефон</label>
        <v-text-field
          outlined
          v-mask="'+# (###) ###-##-##'"
          v-model="phone"
          class="custom-input settings__input"
          :class="{ invalid: invalidPhone }"
          :error-messages="invalidPhone"
          @change="changeUserInfo({ type: 'phone', data: phone })"
          type="tel"
          id="phone"
        ></v-text-field>
      </div>
      <div class="field">
        <label for="email">Email</label>
        <v-text-field
          outlined
          :value="getUserInfo.email"
          id="email"
          type="email"
          :class="{ invalid: invalidEmail }"
          :error-messages="invalidEmail"
          class="custom-input setting__input"
          @change="changeUserInfo({ type: 'email', data: $event })"
        ></v-text-field>
      </div>
      <button
        class="settings__change"
        type="submit"
        @click.prevent="changeInfo"
      >
        <span> Изменить</span>
      </button>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapGetters, mapState } from "vuex";
import { validationMixin } from "vuelidate";
import {
  maxLength,
  email as emailAddress,
  required,
} from "vuelidate/lib/validators";
export default {
  metaInfo: {
    title: "Контактная информация - PolyWeb",
  },
  mixins: [validationMixin],
  validations: {
    getUserInfo: {
      email: { maxLength: maxLength(255), emailAddress, required },
    },
  },
  data() {
    return {
      phone: "",
    };
  },
  created() {
    this.phone = this.getUserInfo.phone;
  },
  computed: {
    invalidEmail() {
      if (
        this.$v.getUserInfo.email.$dirty &&
        (!this.$v.getUserInfo.email.emailAddress ||
          !this.$v.getUserInfo.email.required)
      ) {
        return this.VALIDATION_ERRORS.email;
      } else if (
        this.$v.getUserInfo.email.$dirty &&
        !this.$v.getUserInfo.email.maxLength
      ) {
        return this.VALIDATION_ERRORS.maxLength;
      } else if (this.RESPONSE_ERROR.email) {
        return this.RESPONSE_ERROR.email;
      }
    },
    invalidPhone() {
      if (this.RESPONSE_ERROR.phone) {
        return this.RESPONSE_ERROR.phone;
      }
    },
    ...mapGetters(["getUserInfo"]),
    ...mapState({
      VALIDATION_ERRORS: (state) => state.validationErrors,
      RESPONSE_ERROR: (state) => state.error,
    }),
  },
  methods: {
    changeInfo() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit("changeInfo", "contact-info");
      }
    },
    ...mapMutations(["changeUserInfo"]),
  },
};
</script>