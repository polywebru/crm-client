<template>
  <div class="form-wrapper">
    <server-error-alert :show-alert="showAlert"></server-error-alert>
    <v-card class="mx-auto my-auto d-flex" elevation="3" max-width="600" min-height="112" v-if="showAlertEmail">
      <v-card-text style="color: black;" class="text-center align-self-center">Ссылка для восстановления пароля
        отправлена на почту
      </v-card-text>
      <v-btn icon absolute @click="closeEmail">
        <close-icon fill-color="#848484"></close-icon>
      </v-btn>
    </v-card>
    <div class="form-block" v-else>
      <v-form class="login-form mx-auto">
        <logo-block/>
        <h1 class="text-center">Восстановление пароля</h1>
        <div class="d-flex flex-column mt-6">
          <div class="field-wrapper">
            <label for="email">Email</label>
            <v-text-field
                placeholder="Введите Email"
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
import ServerErrorAlert from "@/components/ServerErrorAlert";
import CloseIcon from 'vue-material-design-icons/Close.vue';
import {validationMixin} from "vuelidate";
import {email, required} from "vuelidate/lib/validators";
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  components: {ServerErrorAlert, LogoBlock, CloseIcon},
  name: "ForgotPassword",
  metaInfo: {
    title: "Забыл пароль",
    htmlAttrs: {
      lang: "ru",
    },
  },
  data() {
    return {
      emailAddress: "",
      showAlert: false,
      showAlertEmail: false,
    }
  },
  mixins: [validationMixin],
  validations: {
    emailAddress: {
      email,
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
  },
  methods: {
    ...mapMutations(["setError", "setFormPending"]),
    ...mapActions(["forgotPassword"]),

    async submitHandler() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        try {
          await this.forgotPassword({
            email: this.emailAddress,
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
              // else if (
              //     (error.response && error.response.status === 400) ||
              //     this.ERROR === 400
              // ){
              //   localStorage.clear();
              //   this.showAlertEmail = true;
              //   setTimeout(() => {
              //     this.showAlertEmail = false;
              //   }, 2000);
          // }
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
    closeEmail(){
      this.showAlertEmail = false
      this.$router.push('/')
    },
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

.login-form h1 {
  font-weight: 600;
}

.login-form {
  padding: 70px 115px;
  max-width: 700px;
}

@media screen and (max-width: 768px) {
  .login-form {
    padding: 0;
    max-width: 700px;
  }
}

.btn-reset span {
  font-size: 14px !important;
}
</style>