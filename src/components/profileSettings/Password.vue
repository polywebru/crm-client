<template>
  <div class="password-info">
    <div class="password-text-fields">
      <div class="field">
        <label for="oldPassword">Пароль</label>
        <v-text-field
          outlined
          v-model="oldPassword"
          class="custom-input settings__input"
          :class="{ invalid: invalidOldPassword }"
          :error-messages="invalidOldPassword"
          type="password"
          id="oldPassword"
        ></v-text-field>
      </div>
      <div class="field">
        <label for="newPassword">Новый пароль</label>
        <v-text-field
          outlined
          v-model="newPassword"
          class="custom-input settings__input"
          :class="{ invalid: invalidNewPassword }"
          :error-messages="invalidNewPassword"
          type="password"
          id="newPassword"
        ></v-text-field>
      </div>
      <div class="field">
        <label for="confirmPassword">Подтвердите пароль</label>
        <v-text-field
          outlined
          v-model="confirmPassword"
          class="custom-input settings__input"
          :class="{ invalid: invalidPasswordConfirmation }"
          :error-messages="invalidPasswordConfirmation"
          type="password"
          id="confirmPassword"
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
import { validationMixin } from "vuelidate";
import {
  maxLength,
  minLength,
  sameAs,
  required,
} from "vuelidate/lib/validators";
import { mapState } from "vuex";

export default {
  metaInfo: {
    title: "Пароль - PolyWeb",
  },
  mixins: [validationMixin],
  validations: {
    oldPassword: {
      minLength: minLength(5),
      maxLength: maxLength(255),
      required,
    },
    newPassword: {
      minLength: minLength(5),
      maxLength: maxLength(255),
      required,
    },
    confirmPassword: {
      sameAs: sameAs(function () {
        return this.newPassword;
      }),
      required,
    },
  },
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
  },
  computed: {
    invalidOldPassword() {
      if (
        this.$v.oldPassword.$dirty &&
        (!this.$v.oldPassword.minLength || !this.$v.oldPassword.required)
      ) {
        return this.VALIDATION_ERRORS.minLengthPassword;
      } else if (this.$v.oldPassword.$dirty && !this.$v.oldPassword.maxLength) {
        return this.VALIDATION_ERRORS.maxLength;
      } else if (this.RESPONSE_ERROR.old_password) {
        return this.RESPONSE_ERROR.old_password;
      }
    },
    invalidNewPassword() {
      if (
        this.$v.newPassword.$dirty &&
        (!this.$v.newPassword.minLength || !this.$v.newPassword.required)
      ) {
        return this.VALIDATION_ERRORS.minLengthPassword;
      } else if (this.$v.newPassword.$dirty && !this.$v.newPassword.maxLength) {
        return this.VALIDATION_ERRORS.maxLength;
      }
    },
    invalidPasswordConfirmation() {
      if (this.$v.confirmPassword.$dirty && !this.$v.confirmPassword.sameAs) {
        return this.VALIDATION_ERRORS.passwordsNotMatch;
      }
    },
    ...mapState({
      VALIDATION_ERRORS: (state) => state.validationErrors,
      RESPONSE_ERROR: (state) => state.error,
    }),
  },
  methods: {
    changeInfo() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit("changePassword", {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          confirmPassword: this.confirmPassword,
        });
      }
    },
  },
};
</script>