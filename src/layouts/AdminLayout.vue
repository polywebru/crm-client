<template>
  <div class="admin" data-app="true">
    <header class="admin__header" v-if="!ADMIN_LOADING && HAS_ACCESS">
      <h1 class="admin__logo">PolyWeb Admin</h1>
      <div class="admin__toolkits">
        <theme-switcher></theme-switcher>
        <div class="admin__avatar">
          <img src="@/assets/img/no_avatar.png" alt="Аватар" />
        </div>
      </div>
    </header>
    <cat-loader v-if="ADMIN_LOADING"></cat-loader>
    <div class="admin__inner" v-else>
      <div
        class="dashboard"
        :class="{ 'admin__sidebar--hide': sidebarHide }"
        v-if="HAS_ACCESS"
      >
        <aside class="admin__sidebar">
          <div class="admin__links">
            <router-link
              v-for="(link, index) in links"
              exact
              exact-active-class="admin__links-item--active"
              :key="index"
              :to="link.path"
              class="admin__links-item"
              >{{ link.title }}</router-link
            >
          </div>
        </aside>
      </div>

      <router-view v-if="HAS_ACCESS"></router-view>
      <no-access v-else></no-access>
    </div>
    <v-btn
      class="admin__toggle-panel"
      v-if="HAS_ACCESS && !ADMIN_LOADING"
      :class="{ clicked: sidebarHide }"
      elevation="2"
      @click="sidebarHide = !sidebarHide"
      fab
      ><v-icon class="admin__toggle-icon" :class="{ toggled: sidebarHide }"
        >mdi-chevron-left</v-icon
      ></v-btn
    >
  </div>
</template>

<script>
import { mapState } from "vuex";
import NoAccess from "../components/admin/NoAccess.vue";
import ThemeSwitcher from "../components/ThemeSwitcher.vue";
import CatLoader from "@/components/CatLoader.vue";
export default {
  data() {
    return {
      sidebarHide: false,
      links: [{ title: "Пользователи", path: "/admin/users" }],
    };
  },
  computed: mapState({
    HAS_ACCESS: (state) => state.admin.hasAccess,
    ADMIN_LOADING: (state) => state.admin.adminLoading,
  }),
  components: { ThemeSwitcher, NoAccess, CatLoader },
};
</script>
<style lang="scss">
@import "@/assets/styles/_variables.scss";
.dashboard {
  height: 100%;
  width: 240px;
  transition: all 0.2s ease-out;
  &.admin__sidebar--hide {
    width: 0;
    transition: all 0.2s ease-out;
  }
  @media (max-width: 796px) {
    border-right: none;
    max-width: 290px;
    margin: 0 auto;
    height: 42px;
    border-bottom: 1px solid #c4c4c4;
  }
}
.admin {
  height: 100vh;
  overflow: hidden;
  position: relative;
  &__toggle-panel {
    position: absolute;
    left: 160px;
    z-index: 200;
    bottom: 2%;
    transition: all 0.3s;
    width: 35px !important;
    height: 35px !important;
    @media (max-width: 796px) {
      display: none;
    }
    &.clicked {
      left: 0;
      transition: all 0.3s;
    }
    background-color: $blue !important;
  }
  &__toggle-icon {
    color: #fff !important;
    &.toggled {
      transform: rotate(180deg);
    }
  }
  &__dashboard {
    width: 100%;
  }
  &__inner {
    height: 100%;
    display: flex;
    @media (max-width: 796px) {
      flex-direction: column;
    }
  }
  background-color: var(--main-bg);
  @media (max-width: 796px) {
    overflow: auto;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--layout-bg);
    padding: 14px 37px;
  }
  &__logo {
    color: #fff;
    font-weight: bold;
    font-size: 18px;
    line-height: 25px;
  }
  &__toolkits {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-left: 24px;
    img {
      width: inherit;
      height: inherit;
      border-radius: inherit;
    }
  }
  &__sidebar {
    height: 100%;
    max-width: 240px;
    background-color: var(--admin-sidebar-bg);
    width: 100%;
    border-right: 1px solid #c4c4c4;
    transition: all 0.2s ease-out;
    position: relative;
    z-index: 1;
    a {
      visibility: visible;
      transition: all 0.1s ease-in;
    }
    &--hide {
      z-index: -1;
      width: 0;
      a {
        visibility: hidden;
        transition: all 0.1s ease-in;
      }
      transition: all 0.2s ease-out;
    }
    @media (max-width: 796px) {
      border-right: none;
      max-width: 290px;
      margin: 0 auto;
      height: 42px;
      border-bottom: 1px solid #c4c4c4;
    }
  }
  &__links {
    display: flex;
    width: 100%;
    flex-direction: column;
    @media (max-width: 796px) {
      flex-direction: row;
    }
    &-item {
      padding: 15px 36px;
      font-weight: 600;
      font-size: 14px;
      line-height: 19px;
      color: var(--text-color);
      position: relative;

      &::after {
        @media (max-width: 796px) {
          content: "";
          position: absolute;
          transition: width 0.3s ease;
          display: block;
          height: 2px;
          width: 0;
          left: 0;
          top: 40.6px;
          background-color: $black;
          z-index: 200;
        }
      }
      @media (max-width: 796px) {
        color: #c4c4c4;
        padding: 15px 36px 10px;
      }
      &--active {
        color: var(--text-color);
        background-color: var(--link-hover);
        @media (max-width: 796px) {
          background-color: var(--admin-sidebar-bg);
        }
        &::after {
          @media (max-width: 796px) {
            transition: width 0.3s !important;
            width: 100%;
          }
        }
      }
      &:hover {
        background-color: var(--link-hover);
        @media (max-width: 796px) {
          background-color: var(--admin-sidebar-bg);
        }
      }
    }
  }
}
</style>
