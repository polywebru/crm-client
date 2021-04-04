<template>
  <v-card
    elevation="2"
    class="project-item"
    :class="{ 'project-item--grid': isGrid }"
  >
    <v-card-title class="project-title">{{
      activity.projectTitle
    }}</v-card-title>
    <div class="subtitles">
      <v-card-subtitle class="project-subtitle">{{
        activity.projectRole
      }}</v-card-subtitle>
      <v-card-subtitle class="project-subtitle">{{
        activity.duration
      }}</v-card-subtitle>
    </div>
  </v-card>
</template>
<script>
export default {
  props: {
    activity: Object,
    isGrid: Boolean,
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.project-item {
  max-height: 160px;
  margin: 18px auto;
  padding: 10px;
  background-color: var(--main-bg) !important;
  div {
    color: var(--text-color) !important;
  }
  @media (max-width: 1140px) {
    text-align: center;
  }
  width: 100%;
  transition: all 0.3s;
  &--grid {
    width: 45%;
    transition: all 0.3s;
  }
  .subtitles {
    display: flex;
    justify-content: space-between;
    @media (max-width: 1140px) {
      flex-direction: column;
    }
  }
  .project-title {
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    @media (max-width: 1140px) {
      display: flex;
      padding: 2px 5px !important;
      justify-content: center;
    }
  }
  .project-subtitle {
    font-size: 14px;
    line-height: 19px;
  }
}
</style>