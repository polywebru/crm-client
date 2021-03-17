<template>
  <v-app>
    <component :is="layout"></component>
  </v-app>
</template>

<script>
import AuthLayout from "./layouts/auth-layout.vue";
export default {
  name: "App",
  computed: {
    layout() {
      return `${this.$route.meta.layout || "auth"}-layout`;
    },
  },
  components: { AuthLayout },
};
</script>
