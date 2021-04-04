<template>
  <label class="switcher" :class="{ dark: IS_THEME_DARK }">
    <input type="checkbox" @change="setIsThemeDark(!IS_THEME_DARK)" />
    <div class="switcher__img">
      <img
        :src="themeImage"
        alt="Светлая тема"
        :class="{ dark: IS_THEME_DARK }"
      />
    </div>
  </label>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  computed: {
    themeImage() {
      return this.IS_THEME_DARK
        ? require("@/assets/img/moon.svg")
        : require("@/assets/img/sun.svg");
    },
    ...mapState({ IS_THEME_DARK: (state) => state.isThemeDark }),
  },
  methods: mapMutations(["setIsThemeDark"]),
};
</script>
<style lang="scss" scoped>
.switcher {
  position: relative;
  width: 60px;
  height: 35px;
  padding: 2px 0 2px 2px;
  border: 2px solid #0b2755;
  border-radius: 60px;
  cursor: pointer;
  transition: 0.3s cubic-bezier(0.33, 1, 0.32, 1);

  &.dark {
    background-color: #0b2755;
    transition: 0.3s cubic-bezier(0.33, 1, 0.32, 1);
  }
  &__img {
    display: flex;
    align-items: center;
  }
  input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }
  img {
    width: 28px;
    height: 28px;
    transition: 0.3s cubic-bezier(0.33, 1, 0.32, 1);
    &.dark {
      transition: 0.3s cubic-bezier(0.33, 1, 0.32, 1);
      transform: translateX(100%);
    }
  }
}
</style>