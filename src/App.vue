<template>
  <div class="root" :data-dark="IS_THEME_DARK">
    <component :is="layout"></component>
  </div>
</template>

<script>
import AuthLayout from "@/layouts/AuthLayout.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import { mapState } from "vuex";
export default {
  name: "App",
  computed: {
    layout() {
      return `${this.$route.meta.layout || "auth"}-layout`;
    },
    ...mapState({ IS_THEME_DARK: (state) => state.isThemeDark }),
  },
  components: { AuthLayout, MainLayout },
};
</script>
