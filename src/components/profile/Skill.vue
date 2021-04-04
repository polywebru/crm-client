<template>
  <v-chip
    class="pofile-skill profile-skill--even"
    v-if="index % 2 !== 0"
    tag="li"
    label
    ripple
  >
    <slot></slot>
  </v-chip>
  <v-chip class="pofile-skill profile-skill--odd" v-else tag="li" label ripple>
    <slot></slot>
  </v-chip>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
    },
  },

  name: "Skill",
};
</script>

<style lang="scss">
.profile-skill {
  &--odd {
    padding: 8px 20px !important;
    border-radius: 0 !important;
    margin-right: 18px;
    margin-bottom: 11px;
    background-color: var(--skill-odd) !important;
    span {
      color: var(--text-color);
      font-size: 14px !important;
      line-height: 19px;
    }
  }
  &--even {
    padding: 8px 20px !important;
    border-radius: 0 !important;
    margin-right: 18px;
    margin-bottom: 11px;
    background-color: var(--skill-even) !important;
    span {
      color: #fff;
      font-size: 14px !important;
      line-height: 19px;
    }
  }
}
</style>
