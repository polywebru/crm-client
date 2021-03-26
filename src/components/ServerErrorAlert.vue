<template>
  <v-alert
    type="error"
    class="alert-custom"
    elevation="2"
    :class="{ show: showAlert }"
  >
    <span>Упс! Кажется что-то пошло не так.</span>
  </v-alert>
</template>
<script>
export default {
  props: {
    showAlert: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
