<template>
  <div class="form-block">
    <v-form class="login-form">
      <div class="d-flex align-center justify-center mb-1">
        <img src="../assets/img/logo.png" alt="logo" />
        <h1 class="name ml-2">ВЕБ-СТУДИЯ</h1>
      </div>
      <h2 class="main-title text-center">Авторизация</h2>
      <div class="d-flex flex-column mt-6">
        <div class="field-wrapper mb-1">
          <label for="email">Email</label>
          <v-text-field
            placeholder="Введите Email"
            background-color="#fff"
            v-model.trim="emailAddress"
            outlined
            type="email"
            class="custom-input mt-1"
            :class="{
              invalid: invalidEmail || error === 400,
            }"
            id="email"
          ></v-text-field>
          <span
            :class="{ hide: !invalidEmail && error !== 400 }"
            class="v-messages__message"
          >
            {{
              invalidEmail ? "Некорректный email" : "Неверный email или пароль"
            }}
          </span>
        </div>
        <div class="field-wrapper mb-1">
          <label for="password">Пароль</label>
          <v-text-field
            placeholder="Введите пароль"
            background-color="#fff"
            v-model.trim="password"
            outlined
            type="password"
            class="custom-input mt-1"
            :class="{
              invalid: invalidPassword || error === 400,
            }"
            :error-messages="invalidPassword ? 'Введите пароль' : ''"
            id="password"
          ></v-text-field>
          <span :class="{ hide: !invalidPassword }" class="v-messages__message">
            Введите пароль
          </span>
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
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      rememberMe: false,
      emailAddress: "",
      password: "",
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
      console.log(this.$v.emailAddress.$dirty);
      return this.$v.emailAddress.$dirty && this.$v.emailAddress.$invalid;
    },
    invalidPassword() {
      return this.$v.password.$dirty && !this.$v.password.required;
    },
  },
  methods: {
    ...mapMutations(["setFormPending", "setError"]),
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
          await this.$router.push("/profile");
          this.setFormPending(false);
        } catch (error) {
          this.setFormPending(false);
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
</style>