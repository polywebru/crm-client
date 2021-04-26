<template>
  <div class="loader">
    <div class="loader__circle">
      <rotate-loader
        :size="'20px'"
        :color="'#5688F0'"
        :loading="true"
      ></rotate-loader>
    </div>
  </div>
</template>
<script>
import RotateLoader from "vue-spinner/src/RotateLoader.vue";
import { mapState } from "vuex";
export default {
  components: { RotateLoader },
  computed: mapState({ FORM_PENDING: (state) => state.formPending }),
};
</script>
<style lang="scss" scoped>
.loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000000;
  background-color: var(--loader-bg);
  &__circle {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>