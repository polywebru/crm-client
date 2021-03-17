<template>
  <div class="text-center content-block">
    <img :src="imgPath" alt="welcome back" />
    <div class="content">
      <h2 class="main-title">{{ content.title }}</h2>
      <h4 class="subtitle mt-2">{{ content.subtitle }}</h4>
      <v-btn @click="toAuth" class="btn btn-register mt-3">
        {{ content.btnText }}
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: Object,
    isLogin: Boolean,
  },
  computed: {
    imgPath() {
      return require(`@/assets/img/${this.content.imgUrl}`);
    },
  },
  methods: {
    toAuth() {
      this.isLogin
        ? this.$router.push("/register")
        : this.$router.push("/login");
    },
  },
};
</script>
<style lang="scss" scoped>
.content-block {
  margin-right: 50px;
  @media (max-width: 1140px) {
    display: none;
  }
}
.register-invite {
  display: none;
  @media (max-width: 1140px) {
    display: block;
  }
  @media (max-width: 396px) {
    font-size: 16px;
  }
  & > a {
    @media (max-width: 396px) {
      font-size: 16px;
    }
  }
}
</style>