<template>
  <header class="header">
    <div class="header__info" v-once>
      <div class="header__logo">
        <img src="@/assets/img/logo.svg" alt="logo" />
      </div>
      <div class="header__loaders">
        <v-skeleton-loader type="text"></v-skeleton-loader>
        <v-skeleton-loader type="text"></v-skeleton-loader>
        <v-skeleton-loader type="text"></v-skeleton-loader>
      </div>
    </div>
    <div>
      <v-skeleton-loader type="button"></v-skeleton-loader>
    </div>
  </header>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      HEADER_LINKS: ["mainLayout/links"],
      LAYOUT_INFO: ["mainLayoutInfo"],
    }),
  },
};
</script>
<style lang="scss" scoped>
.header {
  min-height: 60px;
}
.header__loaders {
  min-width: 100px;
  display: flex;
  & div {
    min-width: 100px;
    margin-right: 20px;
  }
  @media (max-width: 480px) {
    display: none;
  }
}
</style>
