<template>
  <div>
    <v-app>
      <component :is="layout"></component>
    </v-app>
  </div>
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
