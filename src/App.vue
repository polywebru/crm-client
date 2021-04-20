<template>
  <div class="root" data-app="true" :data-dark="IS_THEME_DARK">
    <component :is="layout"></component>
  </div>
</template>

<script>
import AuthLayout from "@/layouts/AuthLayout.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import { mapState } from "vuex";
export default {
  name: "App",
  computed: {
    layout() {
      return `${this.$route.meta.layout || "auth"}-layout`;
    },
    ...mapState({ IS_THEME_DARK: (state) => state.isThemeDark }),
  },
  components: { AuthLayout, MainLayout, AdminLayout },
};
</script>
