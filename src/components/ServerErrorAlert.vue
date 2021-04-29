<template>
  <v-alert
    type="error"
    class="alert-custom show"
    elevation="2"
    v-show="ERROR_ALERT.isShow"
  >
    <span>{{
      ERROR_ALERT.message || "Упс! Кажется что-то пошло не так."
    }}</span>
  </v-alert>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({ ERROR_ALERT: (state) => state.errorAlert }),
  },
};
</script>
