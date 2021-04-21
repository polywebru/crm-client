<template>
  <div class="form-wrapper">
    <div class="form-block">
      <v-form class="login-form mx-auto ">
        <logo-block/>
        <h1 class="text-center">Восстановление пароля</h1>
        <div class="form-row password second-page mt-6">
          <div class="form-item full">
            <label for="password">Пароль</label>
            <v-text-field
                v-model="password"
                placeholder="Пароль"
                required
                :error-messages="passwordInvalid"
                background-color="#fff"
                :counter="255"
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
            <label for="repeatPassword">Повторите пароль</label>
            <v-text-field
                v-model="password_confirmation"
                placeholder="Повторите пароль"
                background-color="#fff"
                required
                :error-messages="passwordConfirmationInvalid"
                autocomplete="on"
                outlined
                type="password"
                :counter="255"
                class="custom-input mt-1 mb-3"
                :class="{ invalid: passwordConfirmationInvalid }"
                id="repeatPassword"
            ></v-text-field>
          </div>
        </div>
        <div class="d-flex flex-column mt-6">
          <div class="field-wrapper">
            <div class="text-center">
              <v-btn
                  class="btn btn-reset mt-10 py-2 px-sm-12"
                  type="submit"
                  @click.prevent="submitHandler"
              >Восстановить
              </v-btn>
            </div>
          </div>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
import LogoBlock from "../components/LogoBlock.vue";
import {validationMixin} from "vuelidate";
import formDataMixin from "@/mixins/formData.mixin";
import {maxLength, minLength, required, sameAs} from "vuelidate/lib/validators";
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  components: {LogoBlock},
  name: "ResetPassword",
  metaInfo: {
    title: "Забыл пароль",
    htmlAttrs: {
      lang: "ru",
    },
  },
  data (){
    return{
      password_confirmation: "",
      password: "",
    }
  },
  mixins: [validationMixin],
  validations: {
      password: {
        required,
        maxLength: maxLength(255),
        minLength: minLength(5),
      },
      password_confirmation: {
        required,
        sameAs: sameAs(function () {
          return this.password;
        }),
      },
  },
  computed: {
    ...mapGetters(["error"]),
    passwordInvalid() {
      if (
          this.$v.password.$invalid &&
          this.$v.password.$dirty
      ) {
        return ["Минимальная длина 5 символов"];
      }
    },
    passwordConfirmationInvalid() {
      if (
          this.$v.password_confirmation.$invalid &&
          this.$v.password_confirmation.$dirty
      ) {
        return ["Пароли не совпадают"];
      }
    },
  },
  methods:{
    ...mapMutations(["setError", "setFormPending"]),
    ...mapActions(["resetPassword"]),

    async submitHandler() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        try {
          this.setFormPending(true);
          await this.resetPassword({
            password: this.password,
          });
          // await this.$router.push(`/reset-password`);
          this.setFormPending(false);
        } catch (error) {
          this.setFormPending(false);
          if (
              (error.response && error.response.status >= 500) ||
              this.ERROR >= 500
          ) {
            localStorage.clear();
            this.showAlert = true;
            setTimeout(() => {
              this.showAlert = false;
            }, 2000);
          }
        }
      }
    },
  }
}
</script>

<style scoped>

</style>