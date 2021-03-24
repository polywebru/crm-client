<template>
  <div class="form-wrapper">
    <server-error-alert
      @dismissAlert="dismissAlert"
      :showAlert="showAlert"
    ></server-error-alert>
    <div class="form-block">
      <auth-loader :isLoading="isLoading" />
      <v-form class="login-form">
        <logo-block />
        <h2 class="main-title text-center">Авторизация</h2>
        <div class="d-flex flex-column mt-6">
          <div class="field-wrapper mb-6">
            <label for="email">Email</label>
            <v-text-field
              label="Введите Email"
              background-color="#fff"
              v-model.trim="emailAddress"
              outlined
              single-line
              type="email"
              class="custom-input login-input mt-1 mb-3"
              :class="{
                invalid: invalidEmail,
              }"
              :error-messages="invalidEmail"
              id="email"
            ></v-text-field>
          </div>
          <div class="field-wrapper mb-6">
            <label for="password">Пароль</label>
            <v-text-field
              label="Введите пароль"
              single-line
              background-color="#fff"
              v-model.trim="password"
              outlined
              type="password"
              class="custom-input login-input mt-1 mb-4"
              :class="{
                invalid: invalidPassword || (error && 'email' in error),
              }"
              id="password"
            ></v-text-field>
          </div>
          <div class="d-flex">
            <v-checkbox
              v-model="rememberMe"
              label="Запомнить меня"
              color="#5688F0"
              class="ml-2 custom-check justify-start"
            ></v-checkbox>
          </div>
        </div>
        <div class="text-center">
          <v-btn
            class="btn btn-login mt-2"
            type="submit"
            @click.prevent="submitHandler"
            >Войти
          </v-btn>
        </div>
        <p class="text-center mt-3 register-invite">
          Не зарегистрированы?
          <router-link to="/register">Зарегистрируйтесь</router-link>
        </p>
      </v-form>
    </div>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { mapActions, mapGetters, mapMutations } from "vuex";
import AuthLoader from "../AuthLoader.vue";
import LogoBlock from "../LogoBlock.vue";
import ServerErrorAlert from "../ServerErrorAlert.vue";

export default {
  components: { LogoBlock, AuthLoader, ServerErrorAlert },
  metaInfo: {
    title: "Авторизация",
    htmlAttrs: {
      lang: "ru",
    },
  },
  data() {
    return {
      rememberMe: false,
      emailAddress: "",
      password: "",
      isLoading: false,
      showAlert: false,
    };
  },
  mixins: [validationMixin],
  validations: {
    emailAddress: {
      email,
      required,
    },
    password: {
      required,
    },
  },
  computed: {
    ...mapGetters(["error"]),
    invalidEmail() {
      if (this.$v.emailAddress.$dirty && this.$v.emailAddress.$invalid) {
        return ["Некорректный email"];
      } else if (this.error && "email" in this.error) {
        return this.error.email;
      }
    },
    invalidPassword() {
      if (this.$v.password.$dirty && !this.$v.password.required) {
        return ["Введите пароль"];
      }
    },
  },
  methods: {
    ...mapMutations(["setError"]),
    ...mapActions(["login"]),
    async submitHandler() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        try {
          this.isLoading = true;
          await this.login({
            email: this.emailAddress,
            password: this.password,
            rememberMe: +this.rememberMe,
          });
          await this.$router.push("/profile");
          this.isLoading = false;
        } catch (error) {
          this.isLoading = false;
          if (error.response && error.response.status >= 500) {
            this.showAlert = true;
          }
        }
      }
    },
    dismissAlert() {
      this.showAlert = false;
    },
  },
  destroyed() {
    this.$v.$reset();
    this.setError(null);
  },
};
</script>

<style lang="scss" scoped>
.field-wrapper {
  @media (max-width: 396px) {
    padding-top: 3px;
  }
}
</style>
