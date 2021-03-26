<template>
  <header class="header">
    <div class="header__info" v-once>
      <div class="header__logo">
        <img src="@/assets/img/logo.png" alt="logo" />
      </div>
      <nav class="header__nav">
        <router-link
          class="header__link"
          v-for="(link, index) in HEADER_LINKS(true)"
          :key="index"
          :to="link.path"
          >{{ link.title }}</router-link
        >
      </nav>
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
