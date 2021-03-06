<template>
  <div class="first-page d-flex flex-column">
    <div class="form-row second-page">
      <div class="form-item full">
        <label for="phone">Телефон</label>
        <v-text-field
          v-model="formData.phone"
          placeholder="Телефон"
          v-mask="'+7 (###) ###-##-##'"
          append-icon="mdi-cellphone"
          :error-messages="phoneInvalid"
          background-color="#fff"
          outlined
          :class="{ invalid: phoneTakenError }"
          type="tel"
          class="custom-input mt-1 mb-3"
          id="phone"
        ></v-text-field>
      </div>
    </div>
    <div class="form-row second-page">
      <div class="form-item full">
        <label for="email" class="required-line">Email</label>
        <v-text-field
          v-model="formData.email"
          placeholder="Email"
          background-color="#fff"
          append-icon="mdi-email"
          required
          :error-messages="emailInvalid"
          outlined
          type="email"
          maxLength="255"
          :counter="255"
          class="custom-input mt-1 mb-3"
          :class="{ invalid: emailInvalid || emailTakenError }"
          id="email"
        ></v-text-field>
      </div>
    </div>
    <div class="form-row second-page">
      <div class="form-item full">
        <label for="username" class="required-line">Имя пользователя</label>
        <v-text-field
          v-model="formData.username"
          placeholder="Username"
          append-icon="mdi-account"
          background-color="#fff"
          :counter="255"
          maxLength="255"
          required
          :error-messages="usernameInvalid"
          outlined
          type="text"
          class="custom-input mt-1 mb-3"
          :class="{ invalid: usernameInvalid || usernameTakenError }"
          id="username"
        ></v-text-field>
      </div>
    </div>

    <div class="form-row password second-page">
      <div class="form-item full">
        <label for="password" class="required-line">Пароль</label>
        <v-text-field
          v-model="formData.password"
          placeholder="Пароль"
          append-icon="mdi-lock"
          required
          :error-messages="passwordInvalid"
          background-color="#fff"
          :counter="255"
          maxLength="255"
          outlined
          type="password"
          autocomplete="on"
          class="custom-input mt-1 mb-3"
          :class="{ invalid: passwordInvalid }"
          id="password"
        ></v-text-field>
      </div>
    </div>
    <div class="form-row second-page">
      <div class="form-item full">
        <label for="repeatPassword" class="required-line"
          >Повторите пароль</label
        >
        <v-text-field
          v-model="formData.password_confirmation"
          placeholder="Повторите пароль"
          append-icon="mdi-lock-check"
          background-color="#fff"
          required
          :error-messages="passwordConfirmationInvalid"
          autocomplete="on"
          outlined
          type="password"
          :counter="255"
          maxLength="255"
          class="custom-input mt-1 mb-3"
          :class="{ invalid: passwordConfirmationInvalid }"
          id="repeatPassword"
        ></v-text-field>
      </div>
    </div>
    <div class="button-row mt-2">
      <v-btn class="btn btn-login back mb-3" @click="backHandler"
        >Вернуться</v-btn
      >
      <v-btn
        type="submit"
        class="btn btn-login pl-3 pr-3 mb-3 register"
        @click.prevent="registerHandler"
      >
        Зарегистрироваться
      </v-btn>
    </div>
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
import { mapMutations, mapState } from "vuex";
import formDataMixin from "@/mixins/formData.mixin";
export default {
  mixins: [validationMixin, formDataMixin],
  props: {
    emailTakenError: String,
    usernameTakenError: String,
    phoneTakenError: String,
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
      if (this.$v.formData.email.$invalid && this.$v.formData.email.$dirty) {
        return ["Некорректный email"];
      } else if (this.emailTakenError) {
        return [this.emailTakenError];
      }
    },
    phoneInvalid() {
      return this.phoneTakenError && [this.phoneTakenError];
    },
    usernameInvalid() {
      if (
        this.$v.formData.username.$invalid &&
        this.$v.formData.username.$dirty
      ) {
        return [];
      } else if (this.usernameTakenError) {
        return [this.usernameTakenError];
      }
    },
    passwordInvalid() {
      if (
        this.$v.formData.password.$invalid &&
        this.$v.formData.password.$dirty
      ) {
        return ["Минимальная длина 5 символов"];
      }
    },
    passwordConfirmationInvalid() {
      if (
        this.$v.formData.password_confirmation.$invalid &&
        this.$v.formData.password_confirmation.$dirty
      ) {
        return ["Пароли не совпадают"];
      }
    },
    ...mapState({ USERNAME: (state) => state.auth.user.username }),
  },
  methods: {
    registerHandler() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit("updateUser", this.formData, this.page);
        this.$emit("register", this.formData);
      }
    },
    backHandler() {
      this.$emit("updateUserState", this.formData, this.page - 1);
    },
    ...mapMutations(["removeErrors"]),
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
  destroyed() {
    this.removeErrors();
  },
};
</script>
<style lang="scss" scoped>
.required-line {
  position: relative;
  &::after {
    position: absolute;
    content: "*";
    top: 50%;
    transform: translateY(-50%);
    left: calc(100% + 5px);
    color: rgb(200, 0, 0);
  }
}
</style>