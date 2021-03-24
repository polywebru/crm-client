<template>
  <v-alert
    type="error"
    class="alert-custom"
    elevation="2"
    :class="{ show: showAlert }"
    @click="dismissAlert"
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
  methods: {
    dismissAlert() {
      this.$emit("dismissAlert");
    },
  },
};
</script>
