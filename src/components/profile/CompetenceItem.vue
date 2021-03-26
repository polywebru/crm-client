<template>
  <v-card
    elevation="2"
    class="competence-item"
    :class="{ 'competence-item--grid': isGrid }"
  >
    <v-card-title>{{ activity.competenceTitle }}</v-card-title>
    <v-card-title>{{ activity.competenceLevel }}</v-card-title>
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
.competence-item {
  max-height: 120px;
  padding: 0 10px;
  width: 100%;
  margin: 18px auto;
  transition: all 0.3s;
  display: flex;
  align-items: center;

  justify-content: space-between;
  &--grid {
    width: 45%;
    transition: all 0.3s;
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 480px) {
    width: 100%;
    transition: all 0.3s;
    flex-direction: column;
  }
  & > div {
    font-size: 16px !important;
    line-height: 20px !important;
    &:nth-child(2) {
      @media (max-width: 480px) {
        padding-bottom: 10px;
      }
    }
    @media (max-width: 480px) {
      padding: 10px 10px 0;

      font-size: 14px !important;
      line-height: 19px !important;
    }
  }
}
</style>