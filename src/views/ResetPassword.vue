<template>
  <div class="form-wrapper">
    <server-error-alert :show-alert="showAlert"></server-error-alert>
    <v-card class="mx-auto my-auto d-flex" elevation="3" max-width="600" min-height="112" v-if="showAlertEmail">
      <v-card-text style="color: black;" class="text-center align-self-center">
        Ваш пароль успешно изменен
      </v-card-text>
      <v-btn icon absolute @click="closeReset">
        <close-icon fill-color="#848484"></close-icon>
      </v-btn>
    </v-card>
    <div class="form-block" v-else>
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
                  class="btn btn-reset mt-5 py-2 px-sm-12"
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
import ServerErrorAlert from "@/components/ServerErrorAlert";
import CloseIcon from 'vue-material-design-icons/Close.vue';
import {validationMixin} from "vuelidate";
import formDataMixin from "@/mixins/formData.mixin";
import {maxLength, minLength, required, sameAs} from "vuelidate/lib/validators";
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  components: {LogoBlock, ServerErrorAlert, CloseIcon},
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
      token: "",
      showAlert: false,
      showAlertEmail: false,
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
    ...mapMutations(["setError"]),
    ...mapActions(["resetPassword"]),

    async submitHandler() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        try {
          await this.resetPassword({
            token: this.$route.query.token,
            password: this.password,
            password_confirmation: this.password_confirmation
          });
        } catch (error) {
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
          else if (
              (error.response && error.response.status === 200) ||
              this.ERROR === 200
          ) {
            localStorage.clear();
            this.showAlertEmail = true;
          }
        }
      }
    },
    closeReset(){
      this.showAlertEmail = false
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.v-card__text {
  font-weight: 600;
}

.v-btn--absolute {
  right: 0;
}
</style>