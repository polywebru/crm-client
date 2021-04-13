<template>
  <div class="d-flex align-center justify-center">
    <div class="d-flex custom-container align-center justify-center">
      <content-block :content="loginContent" :isLogin="true" />
      <login-form />
    </div>
  </div>
</template>

<script>
import ContentBlock from "@/components/ContentBlock.vue";
import LoginForm from "@/components/login/LoginForm.vue";
export default {
  components: { ContentBlock, LoginForm },
  name: "Login",
  metaInfo: {
    title: "Авторизация",
    htmlAttrs: {
      lang: "ru",
    },
  },
  data() {
    return {
      loginContent: {
        imgUrl: "login_img.jpg",
        btnText: "Регистрация",
        subtitle: "Ещё не с нами?",
        title: "С Возвращением!",
      },
    };
  },
};
</script>
<style lang="scss" >
.custom-container {
  max-width: 1200px !important;
}

@media (max-width: 1140px) {
  .custom-container {
    flex-direction: column;
    max-width: 386px !important;
    width: 100%;
  }
}
</style>


