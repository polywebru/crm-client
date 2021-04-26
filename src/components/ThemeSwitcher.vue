<template>
  <div class="switcher">
    <label>
      <input type="checkbox" @change="setIsThemeDark(!IS_THEME_DARK)"  />
      <span :class="{ dark: IS_THEME_DARK }"></span>
    </label>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState({ IS_THEME_DARK: (state) => state.isThemeDark }),
  },
  methods: mapMutations(["setIsThemeDark"]),
};
</script>
<style lang="scss" scoped>
.switcher {
  input {
    display: none;
  }
  span.dark {
    border-color: #333;
    background: #2c4e63;
    &:before {
      left: 55%;
      box-shadow: inset -5px 0rem 0 0.4px #ffc207;
      background: transparent;
    }
    &:after {
      content: "★";
      top: 4px;
      left: 26px;
      width: 10px;
      height: 10px;
      font-size: 10px;
      color: #ffc207;
    }
  }
  
  span {
    cursor: pointer;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    width: 55px;
    height: 28px;
    border-radius: 60px;
    border: 2px solid #666;
    background: #5197c4;
    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    &:before {
      content: '';
      position: absolute;
      top: 2px;
      left: 3px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      box-shadow: inset -4rem -4rem 0 0 #ffc207;
      transition: all 0.5s cubic-bezier(0, 0.55, 0.45, 1);
      &.dark{
        left: 55%;
        box-shadow: inset -5px 0rem 0 0.4px #ffc207;
      }
    }
    &:after {
      content: '\002601';
      position: absolute;
      top: 4px;
      left: 10px;
      width: 1px;
      height: 1px;
      color: #fff;
      font-size: 20px;
      transition: all 0.5s cubic-bezier(0, 0.55, 0.45, 1);
      &.dark{
        content: "★";
        top: 2px;
        left: 23px;
        width: 10px;
        height: 10px;
        font-size: 10px;
        color: #ffc207;
      }
    }
  }
}
</style>