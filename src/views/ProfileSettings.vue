<template>
  <div class="wrap-settings">
    <cat-loader v-if="IS_LOADING"></cat-loader>
    <in-active-user v-else-if="!IS_LOADING && INACTIVE"></in-active-user>
    <div class="settings" v-else>
      <aside class="settings__sidebar">
        <h1 class="settings__title">Настройки профиля</h1>
        <v-list class="settings__links">
          <v-list-item
            class="settings__links-item"
            v-for="(link, index) in links"
            :key="index"
          >
            <router-link
              class="link"
              exact
              exact-active-class="link--active"
              :to="link.path"
              >{{ link.title }}</router-link
            >
          </v-list-item>
        </v-list>
      </aside>
      <mobile-sidebar :links="links"></mobile-sidebar>
      <main class="settings__main">
        <h2 class="settings__main-title">{{ routeTitle }}</h2>
        <v-form class="settings__form">
          <router-view
            @changeInfo="changeInfo"
            @changePassword="changePassword"
          ></router-view>
        </v-form>
      </main>
    </div>
    <v-alert
      class="settings__changed"
      type="success"
      :class="{ show: settingsChanged }"
    >
      <div>Данные успешно изменены</div>
    </v-alert>
  </div>
</template>
<script>
import routerHooksMixin from "@/mixins/routerHooks.mixin";
import { mapActions, mapState } from "vuex";
import CatLoader from "@/components/CatLoader.vue";
import inActiveUser from "@/components/InActiveUser.vue";
import MobileSidebar from "@/components/profileSettings/MobileSidebar.vue";
export default {
  components: { CatLoader, MobileSidebar, inActiveUser },
  mixins: [routerHooksMixin],
  data() {
    return {
      settingsChanged: false,
      links: [
        { path: "/settings/main-info", title: "Основная информация" },
        { path: "/settings/contact-info", title: "Контактная информация" },
        {
          path: "/settings/additional-info",
          title: "Дополнительная информация",
        },
        { path: "/settings/password", title: "Пароль" },
        { path: "/settings/links", title: "Ссылки" },
        { path: "/settings/skills", title: "Навыки" },
      ],
    };
  },

  computed: {
    routeTitle() {
      return this.links.find((link) => link.path === this.$route.path).title;
    },
    ...mapState({
      IS_LOADING: (state) => state.profile.isLoading,
      INACTIVE: (state) => state.inActiveUser,
    }),
  },
  methods: {
    async changeInfo(route) {
      try {
        await this.changeUserInfo(route);
        this.settingsChanged = true;
        setTimeout(() => {
          this.settingsChanged = false;
        }, 1200);
      } catch (error) {
        if (error === 401) {
          localStorage.clear();
          await this.$router.push({ name: "Login" });
        } else if (error >= 500) {
          this.setErrorAlert({ isShow: true });
          setTimeout(() => {
            this.setErrorAlert({ isShow: false });
          }, 1200);
        }
      }
    },
    async changePassword(passwords) {
      try {
        await this.changeUserPassword(passwords);
        this.settingsChanged = true;
        setTimeout(() => {
          this.settingsChanged = false;
        }, 1200);
      } catch (error) {
        if (error === 401) {
          localStorage.clear();
          await this.$router.push({ name: "Login" });
        } else if (error >= 500) {
          this.setErrorAlert({ isShow: true });
          setTimeout(() => {
            this.setErrorAlert({ isShow: false });
          }, 1200);
        }
      }
    },
    ...mapActions(["changeUserInfo", "changeUserPassword"]),
  },
};
</script>
<style lang="scss" >
@import "@/assets/styles/_variables.scss";
.settings {
  .v-progress-linear {
    max-width: 70%;
    margin: 20px 0;
    @media (max-width: 970px) {
      max-width: 100% !important;
    }
  }
  input {
    color: var(--text-color) !important;
  }
  max-width: calc(839px + 300px);
  &__changed {
    background-color: rgb(10, 209, 10) !important;
    z-index: -100;
    opacity: 0;
    position: fixed;
    bottom: 0;
    right: 10px;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

    &.show {
      z-index: 100;
      opacity: 1;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    @media (max-width: 970px) {
      right: unset;
      left: 50%;
      bottom: 35px;
      transform: translateX(-50%);
    }
    width: 280px;
    div {
      color: #fff !important;
      margin-left: 5px;
    }
  }
  &__menu {
    border-radius: 0 !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    &-opener {
      display: flex;
      justify-content: center;
      width: 100%;
      background-color: var(--link-sidebar-bg);
      padding: 11px 15px;
      .arrow {
        position: absolute;
        left: 90%;
        &__path {
          fill: var(--text-color);
        }
      }
    }
  }
  &__main-title {
    @media (max-width: 970px) {
      margin-bottom: 30px;
      margin-top: 20px;
    }
  }
  @media (max-width: 970px) {
    flex-direction: column;
    align-items: center;
    margin-top: 10px !important;
  }
  label {
    color: var(--text-color);
    &.v-label {
      padding: 0 12px !important;
      top: 50% !important;
      transform: translateY(-50%) !important;
    }
  }

  h2,
  h1 {
    color: var(--text-color);
  }
  .v-input--is-focused {
    fieldset {
      border-color: $blue !important;
    }
  }

  fieldset {
    border-color: #aaa !important;
  }

  .invalid {
    fieldset {
      border-color: $borderInvalid !important;
    }
  }
  div:not(.v-messages__message),
  fieldset,
  input,
  span,
  i {
    color: var(--text-color) !important;
  }
  .delete-photo {
    span {
      color: #ff0000 !important;
    }
  }
  &__sidebar {
    background-color: var(--main-bg) !important;
    @media (max-width: 970px) {
      display: none;
    }
    &--mobile {
      display: none;
      position: relative;
      width: 100%;
      @media (max-width: 970px) {
        display: block;
      }
    }
  }
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin: 60px auto 0;
  padding: 0 20px 10px;
  background-color: var(--main-bg);
  &__photo-title {
    font-weight: 600;
    font-size: 18px;
    line-height: 25px;
    text-align: center;
    color: var(--text-color);
    @media (max-width: 970px) {
      display: none;
    }
  }
  &__form {
    height: 90%;
  }
  &__change {
    border: 2px solid $blue;
    padding: 8px 45px;
    outline: transparent;
    border-radius: 5px;
    display: flex;
    align-items: center;
    max-width: 188px;
    width: 100%;
    margin: 35px auto 0;
    justify-content: center;
    position: relative;
    height: 39px !important;
    &.changing {
      background-color: $blue;
    }
    span {
      color: var(--text-color);
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    &:hover {
      background-color: $blue;
      span {
        color: white !important;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      }
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
  &__input {
    max-height: 25px !important;
  }
  &__title {
    font-weight: bold;
    font-size: 18px;
    line-height: 25px;
    color: var(--text-color);
    padding-left: 30px;
    margin-bottom: 15px;
  }
  &__links {
    background-color: var(--main-bg) !important;
  }
  &__links-item {
    padding: 0 !important;
  }
  .link {
    font-weight: bold;
    font-size: 14px;
    line-height: 19px;
    margin-bottom: 10px;
    color: var(--text-color);
    width: 100%;
    padding: 14px 75px 14px 30px;
    &:last-child {
      margin-bottom: 0;
    }
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

    &:hover {
      background-color: var(--link-sidebar-bg);
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    &--active {
      background-color: var(--link-sidebar-bg);
    }
  }
  &__main {
    width: 65%;
    @media (max-width: 970px) {
      width: 100%;
    }
    &-title {
      font-weight: 600;
      font-size: 18px;
      line-height: 25px;
      columns: var(--text-color);
    }
  }
}
.field {
  margin-top: 45px;
  &:first-child {
    margin-top: 5px;
  }
}
</style>