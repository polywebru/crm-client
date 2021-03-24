<template>
  <div class="form-block">
    <auth-loader :isLoading="isLoading" />
    <v-form class="login-form">
      <logo-block />
      <h2 class="main-title text-center">Регистрация</h2>
      <component
        @updateUserState="updateUserState"
        @register="registerUser"
        @setLoading="setLoading"
        :isEmailTaken="isEmailTaken"
        :isUsernameTaken="isUsernameTaken"
        :is="pageForm"
      ></component>
      <p class="text-center mt-5 register-invite pb-5">
        Уже зарегистрированы?
        <router-link to="/">Авторизуйтесь</router-link>
      </p>
    </v-form>
  </div>
</template>
<script>
import LogoBlock from "../LogoBlock.vue";
import FirstFormPage from "./FirstFormPage.vue";
import SecondFormPage from "./SecondFormPage.vue";
import AuthLoader from "../AuthLoader.vue";

import { mapMutations, mapState, mapActions, mapGetters } from "vuex";

export default {
  components: {
    LogoBlock,
    FirstFormPage,
    SecondFormPage,
    AuthLoader,
  },
  data() {
    return {
      pages: Object.freeze({ 0: "first", 1: "second", 2: "third" }),
      currentPage: null,
      isLoading: false,
      isEmailTaken: false,
      isUsernameTaken: false,
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
    async registerUser(user) {
      try {
        this.setLoading(true);
        await this.register(user);
        this.setLoading(false);
      } catch (error) {
        this.setLoading(false);
        if (this.error && "email" in this.error) {
          this.isEmailTaken = true;
        } else if (this.error && "username" in this.error) {
          this.isUsernameTaken = true;
        }
      }
    },
  },
};
</script>