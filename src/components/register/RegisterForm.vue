<template>
  <div class="form-wrapper">
    <server-error-alert
      @dismissAlert="dismissAlert"
      :showAlert="showAlert"
    ></server-error-alert>
    <div class="form-block">
      <auth-loader :isLoading="isLoading" />
      <v-form class="login-form">
        <logo-block></logo-block>
        <h2 class="main-title text-center">Регистрация</h2>
        <component
          @updateUserState="updateUserState"
          @register="registerUser"
          @setLoading="setLoading"
          :emailTakenError="emailTakenError"
          :usernameTakenError="usernameTakenError"
          :phoneTakenError="phoneTakenError"
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
import AuthLoader from "../AuthLoader.vue";

import { mapMutations, mapState, mapActions, mapGetters } from "vuex";
import ServerErrorAlert from "../ServerErrorAlert.vue";
export default {
  metaInfo: {
    title: "Регистрация",
    htmlAttrs: {
      lang: "ru",
    },
  },
  components: {
    LogoBlock,
    FirstFormPage,
    SecondFormPage,
    AuthLoader,
    ServerErrorAlert,
  },
  data() {
    return {
      pages: Object.freeze({ 0: "first", 1: "second", 2: "third" }),
      currentPage: null,
      isLoading: false,
      emailTakenError: "",
      usernameTakenError: "",
      phoneTakenError: "",
      showAlert: false,
    };
  },
  created() {
    this.currentPage = this.pages[0];
  },
  computed: {
    pageForm() {
      return `${this.currentPage}-form-page`;
    },
    ...mapState({ USER_STATE: (state) => state.auth.user }),
    ...mapGetters(["error"]),
  },
  methods: {
    ...mapMutations(["setUser"]),
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
    setLoading(isLoading) {
      this.isLoading = isLoading;
    },
    dismissAlert() {
      this.showAlert = false;
    },
    async registerUser(user) {
      try {
        this.setLoading(true);
        await this.register(user);
        this.setLoading(false);
      } catch (error) {
        this.setLoading(false);
        if (this.error && typeof this.error === "object") {
          this.emailTakenError = this.error.email?.toString() || "";
          this.usernameTakenError = this.error.username?.toString() || "";
          this.phoneTakenError = this.error.phone?.toString() || "";
        } else if (this.error >= 500) {
          this.showAlert = true;
        }
      }
    },
  },
};
</script>