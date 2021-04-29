<template>
  <div class="no-access">
    <div class="no-access__img">
      <img src="@/assets/img/no_access.jpg" alt="Нет доступа" />
    </div>
    <h2 class="no-access__text">У вас нет доступа к этому разделу</h2>
    <router-link :to="`${LAST_LINK}`" class="no-access__link" >Назад</router-link>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex"
const {mapState} = createNamespacedHelpers("users")
export default {
  computed: {
    ...mapState({
      LAST_LINK: (state) => state.lastLink.path
      })
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
.no-access {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 90%;
  &__text {
    font-weight: bold;
    font-size: 25px;
    margin-top: 10px;
    line-height: 41px;
    color: var(--text-color);
  }
  &__link {
    background-color: $blue;
    color: #fff;
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    line-height: 20px;
    margin-top: 10px;
    max-height: 35px;
    max-width: 144.3px;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    &:hover {
      background-color: var(--main-bg);
      border: 2px solid $blue;
      color: var(--text-color) !important;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
}
</style>