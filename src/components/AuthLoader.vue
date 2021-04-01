<template>
  <div class="loader">
    <div class="loader__circle">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: mapState({ FORM_PENDING: (state) => state.formPending }),
};
</script>
<style lang="scss" scoped>
.loader {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  z-index: 1000000;
  background-color: rgba(255, 255, 255, 0.5);
  &__circle {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>