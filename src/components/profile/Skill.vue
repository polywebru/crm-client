<template>
  <v-chip
    class="pofile-skill profile-skill--even"
    v-if="index % 2 !== 0"
    color="#8E8AFE"
    tag="li"
    label
    ripple
  >
    <slot></slot>
  </v-chip>
  <v-chip
    class="pofile-skill profile-skill--odd"
    v-else
    color="#CBCFFA"
    tag="li"
    label
    ripple
  >
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

<style scoped>
</style>
