<template>
  <div class="first-page d-flex flex-column mt-6">
    <div class="form-row second-page">
      <div class="form-item half">
        <label for="phone">Телефон</label>
        <v-text-field
          v-model="formData.phone"
          placeholder="Телефон"
          v-mask="'+7 (###) ###-##-##'"
          background-color="#fff"
          outlined
          type="tel"
          class="custom-input mt-1"
          id="phone"
        ></v-text-field>
      </div>
      <div class="form-item half">
        <label for="email">Email</label>
        <v-text-field
          v-model="formData.email"
          placeholder="Email"
          background-color="#fff"
          outlined
          hide-details
          type="email"
          class="custom-input mt-1 mb-3"
          :class="{ invalid: emailInvalid || isEmailTaken }"
          id="email"
        ></v-text-field>
        <span
          :class="{ hide: !emailInvalid && !isEmailTaken }"
          class="v-messages__message"
        >
          {{
            emailInvalid ? "Некорректный email" : "Email уже зарегистрирован"
          }}
        </span>
      </div>
    </div>
    <div class="form-row second-page">
      <div class="form-item full">
        <label for="username">Username</label>
        <v-text-field
          v-model="formData.username"
          placeholder="Username"
          background-color="#fff"
          :counter="255"
          outlined
          type="text"
          class="custom-input mt-1 mb-3"
          :class="{ invalid: usernameInvalid || isUsernameTaken }"
          id="username"
        ></v-text-field>
        <span :class="{ hide: !isUsernameTaken }" class="v-messages__message">
          Username уже зарегистрирован
        </span>
      </div>
    </div>
    <div class="form-row second-page">
      <div class="form-item full">
        <label for="password">Пароль</label>
        <v-text-field
          v-model="formData.password"
          placeholder="Пароль"
          background-color="#fff"
          :counter="255"
          outlined
          type="password"
          class="custom-input mt-1 mb-3"
          :class="{ invalid: passwordInvalid }"
          id="password"
        ></v-text-field>
        <span
          :class="{ hide: !passwordInvalid }"
          class="v-messages__message mb-2"
        >
          Минимальная длина пароля 5
        </span>
      </div>
    </div>
    <div class="form-row second-page">
      <div class="form-item full">
        <label for="repeatPassword">Повторите пароль</label>
        <v-text-field
          v-model="formData.password_confirmation"
          placeholder="Повторите пароль"
          background-color="#fff"
          outlined
          type="password"
          :counter="255"
          class="custom-input mt-1 mb-3"
          :class="{ invalid: passwordConfirmationInvalid }"
          id="repeatPassword"
        ></v-text-field>
        <span
          :class="{ hide: !passwordConfirmationInvalid }"
          class="v-messages__message"
        >
          Пароли не совпадают
        </span>
      </div>
    </div>
    <v-row class="mt-4 button-row">
      <v-btn class="btn btn-login pl-10 pr-10" @click="backHandler"
        >Вернуться</v-btn
      >
      <v-btn
        type="submit"
        class="btn btn-login pl-8 pr-8"
        @click.prevent="continueHandler"
        >Продолжить</v-btn
      >
    </v-row>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
} from "vuelidate/lib/validators";
import { mapState } from "vuex";
import userStateMixin from "../../mixins/userState.mixin";

export default {
  mixins: [validationMixin, userStateMixin],
  props: {
    isEmailTaken: Boolean,
    isUsernameTaken: Boolean,
  },
  data() {
    return {
      page: 1,
    };
  },
  validations: {
    formData: {
      email: { required, email },
      username: { required, maxLength: maxLength(255) },
      password: {
        required,
        maxLength: maxLength(255),
        minLength: minLength(5),
      },
      password_confirmation: {
        required,
        sameAs: sameAs(function () {
          return this.formData.password;
        }),
      },
    },
  },
  computed: {
    emailInvalid() {
      return this.$v.formData.email.$invalid && this.$v.formData.email.$dirty;
    },
    usernameInvalid() {
      return (
        this.$v.formData.username.$invalid && this.$v.formData.username.$dirty
      );
    },
    passwordInvalid() {
      return (
        this.$v.formData.password.$invalid && this.$v.formData.password.$dirty
      );
    },
    passwordConfirmationInvalid() {
      return (
        this.$v.formData.password_confirmation.$invalid &&
        this.$v.formData.password_confirmation.$dirty
      );
    },
    ...mapState({ USERNAME: (state) => state.auth.user.username }),
  },
  methods: {
    continueHandler() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit("updateUserState", this.formData, this.page + 1);
      }
    },
    backHandler() {
      this.$emit("updateUserState", this.formData, this.page - 1);
    },
  },
  watch: {
    "formData.email"() {
      if (!this.USERNAME) {
        this.formData.username = this.formData.email.slice(
          0,
          this.formData.email.indexOf("@")
        );
      }
    },
  },
};
</script>
