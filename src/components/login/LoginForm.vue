<template>
  <div class="form-wrapper">
    <server-error-alert :showAlert="showAlert"></server-error-alert>
    <div class="form-block">
      <auth-loader></auth-loader>
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
          <div class="field-wrapper password">
            <label for="password">Пароль</label>
            <v-text-field
              label="Введите пароль"
              single-line
              background-color="#fff"
              v-model.trim="password"
              outlined
              type="password"
              class="custom-input login-input mb-4"
              :error-messages="invalidPassword"
              :class="{
                invalid:
                  invalidPassword ||
                  (typeof error === 'object' && error && 'email' in error),
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
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
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
      } else if (
        this.error &&
        typeof this.error === "object" &&
        "email" in this.error
      ) {
        return this.error.email;
      }
    },
    invalidPassword() {
      if (this.$v.password.$dirty && !this.$v.password.required) {
        return ["Введите пароль"];
      }
    },
    ...mapState({ USERNAME: (state) => state.profile.userInfo.username }),
  },
  methods: {
    ...mapMutations(["setError", "setFormPending"]),
    ...mapActions(["login"]),

    async submitHandler() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        try {
          this.setFormPending(true);
          await this.login({
            email: this.emailAddress,
            password: this.password,
            rememberMe: +this.rememberMe,
          });
          await this.$router.push(`/user/${this.USERNAME}`);
          this.setFormPending(false);
        } catch (error) {
          this.setFormPending(false);
          if (error.response && error.response.status >= 500) {
            this.showAlert = true;
            setTimeout(() => {
              this.showAlert = false;
            }, 1300);
          }
        }
      }
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
.password {
  margin: 15px 0 30px !important;
}
</style>
