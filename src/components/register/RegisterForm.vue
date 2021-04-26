<template>
  <div class="form-wrapper">
    <server-error-alert :showAlert="showAlert"></server-error-alert>
    <div class="form-block">
      <div class="spinner" v-if="FORM_PENDING">
        <pacman-loader :color="'#5688f0'"></pacman-loader>
      </div>
      <v-form class="login-form">
        <logo-block></logo-block>
        <h2 class="main-title text-center">Регистрация</h2>
        <component
          @updateUserState="updateUserState"
          @register="registerUser"
          :emailTakenError="emailTakenError"
          :usernameTakenError="usernameTakenError"
          :phoneTakenError="phoneTakenError"
          :dateBirthError="dateBirthError"
          :is="pageForm"
        ></component>
        <p class="text-center mt-5 register-invite pb-5">
          Уже зарегистрированы?
          <router-link to="/">Авторизуйтесь</router-link>
        </p>
      </v-form>
    </div>
  </div>
</template>
<script>
import LogoBlock from "../LogoBlock.vue";
import FirstFormPage from "./FirstFormPage.vue";
import SecondFormPage from "./SecondFormPage.vue";
import PacmanLoader from "vue-spinner/src/PacmanLoader.vue";

import { mapMutations, mapState, mapActions, mapGetters } from "vuex";
import ServerErrorAlert from "../ServerErrorAlert.vue";
export default {
  components: {
    LogoBlock,
    FirstFormPage,
    SecondFormPage,
    PacmanLoader,
    ServerErrorAlert,
  },
  data() {
    return {
      pages: Object.freeze({ 0: "first", 1: "second", 2: "third" }),
      currentPage: null,
      emailTakenError: "",
      usernameTakenError: "",
      phoneTakenError: "",
      showAlert: false,
      dateBirthError: "",
    };
  },
  created() {
    this.currentPage = this.pages[0];
  },
  computed: {
    pageForm() {
      return `${this.currentPage}-form-page`;
    },
    ...mapState({
      USER_STATE: (state) => state.auth.user,
      FORM_PENDING: (state) => state.formPending,
    }),
    ...mapGetters(["error"]),
  },
  methods: {
    ...mapMutations(["setUser", "setFormPending", "removeErrors"]),
    ...mapActions(["register"]),
    isUserUpdated(user) {
      return JSON.stringify(user) !== JSON.stringify(this.USER_STATE);
    },
    updateUserState(user, pageNumber) {
      if (this.isUserUpdated(user)) {
        this.setUser(user);
      }
      this.currentPage = this.pages[pageNumber];
    },
    async registerUser(user) {
      try {
        this.setFormPending(true);
        await this.register(user);
        this.setFormPending(false);
        this.removeErrors();

        await this.$router.push(`/users/${user.username}`);
      } catch (error) {
        this.setFormPending(false);
        if (this.error && typeof this.error === "object") {
          this.emailTakenError = this.error.email?.toString() || "";
          this.usernameTakenError = this.error.username?.toString() || "";
          this.phoneTakenError = this.error.phone?.toString() || "";
          this.dateBirthError = this.error.date_birth?.toString() || "";
        } else if (this.error >= 500) {
          this.showAlert = true;
          localStorage.clear();
          setTimeout(() => {
            this.showAlert = false;
          }, 1300);
        }
      }
    },
  },
};
</script>
<style lang="scss">
.v-menu__content {
  max-width: 100px !important;
}
</style>