<template>
  <div class="loader" v-if="FORM_PENDING">
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>
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
  z-index: 1000000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>