<template>
  <div class="form-wrapper">
    <div class="form-block">
      <v-form class="login-form mx-auto ">
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
import {email, required} from "vuelidate/lib/validators";
import {mapGetters} from "vuex";

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
      emailAddress: "",
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
  }
}
</script>

<style scoped>
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