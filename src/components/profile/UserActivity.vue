<template>
  <div class="user-activity">
    <h3 class="user-activity__title">
      {{ userActivity.title }}
    </h3>

    <div class="user-activities">
      <component
        :is="userActivity.name + '-item'"
        v-for="(activity, index) in activities"
        :activity="activity"
        :isGrid="isGrid"
        :key="index"
      ></component>
    </div>
  </div>
</template>
<script>
import ProjectItem from "./ProjectItem";
import CompetenceItem from "./CompetenceItem";
export default {
  components: { ProjectItem, CompetenceItem },
  props: {
    userActivity: Object,
    activities: Array,
    isGrid: Boolean,
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
.user-activity {
  background-color: $form-bg;
  &::-webkit-scrollbar {
    width: 4px;

    position: relative;
    z-index: -1;
  }
  scrollbar-color: $blue #cacaca;
  scrollbar-width: thin;
  &::-webkit-scrollbar-thumb {
    background-color: $blue;
    position: relative;
    z-index: -1;
    border-radius: 1px;
  }
  overflow-y: auto;
  overflow-x: hidden;
  padding: 40px 25px;
  max-height: 625px;
  @media (min-width: 1920px) {
    max-height: 780px;
  }

  @media (max-width: 780px) {
    border: 2px solid #a5a5a5;
    flex-direction: column;
  }
  &__title {
    text-align: center;
    font-weight: 600;
    font-size: 25px;
    line-height: 30px;
  }
}
.user-activities {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>