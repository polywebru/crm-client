<template>
  <div class="text-center content-block">
    <img :src="imgPath" alt="welcome back" />
    <div class="content">
      <h2 class="main-title">{{ content.title }}</h2>
      <h4 class="subtitle mt-2">{{ content.subtitle }}</h4>
      <v-btn
        :disabled="FORM_PENDING"
        @click="toAuth"
        class="btn btn-register mt-3"
      >
        {{ content.btnText }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    content: Object,
    isLogin: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    imgPath() {
      return require(`@/assets/img/${this.content.imgUrl}`);
    },
    ...mapState({ FORM_PENDING: (state) => state.formPending }),
  },
  methods: {
    toAuth() {
      this.isLogin ? this.$router.push("/register") : this.$router.push("/");
    },
  },
};
</script>
<style lang="scss" scoped>
</style>