<template>
  <div class="d-flex align-center justify-center">
    <auth-loader />
    <div class="d-flex custom-container align-center justify-center">
      <register-form />
      <content-block :content="registerContent" />
    </div>
  </div>
</template>
<script>
import ContentBlock from "../components/ContentBlock.vue";
import AuthLoader from "../components/AuthLoader.vue";
import RegisterForm from "../components/register/RegisterForm.vue";
export default {
  data() {
    return {
      registerContent: {
        imgUrl: "register_img.jpg",
        btnText: "Авторизация",
        subtitle: "Уже зарегистрированы?",
        title: "Добро пожаловать!",
      },
    };
  },
  components: {
    ContentBlock,
    AuthLoader,
    RegisterForm,
  },
};
</script>