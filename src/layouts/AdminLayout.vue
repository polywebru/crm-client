<template>
  <div class="admin" data-app="true">
    <header class="admin__header" v-if="!ADMIN_LOADING && HAS_ACCESS">
      <h1 class="admin__logo">PolyWeb Admin</h1>
      <div class="admin__toolkits">
        <theme-switcher></theme-switcher>
        <burger-menu
          @changeIsLogout="logoutUser"
          :name="getFullName"
          :links="links"
          :username="getUsername"
        ></burger-menu>
        <v-menu tile content-class="header-content-menu" offset-y left>
          <template v-slot:activator="{ attrs, on }">
            <div class="menu-opener" color="#414dbb" v-bind="attrs" v-on="on">
              <div class="menu-avatar">
                <img :src="getUserAvatar" alt="" />
              </div>
              <div class="arrow">
                <svg
                  width="15"
                  height="10"
                  viewBox="0 0 15 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.0441427 2.20165L1.40498 0.909147L7.49998 6.73915L13.595 0.909147L14.9558 2.20165L7.49998 9.33331L0.0441427 2.20165Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </template>
          <v-list>
            <div class="header__private-info menu-item">
              <div class="header__name">{{ getFullName }}</div>
              <div class="header__username">{{ getUsername }}</div>
            </div>
            <div>
              <v-list-item>
                <router-link
                  exact
                  exact-active-class="header__menu-link--active"
                  class="header__menu-link menu-item"
                  :to="'/'"
                  >Профиль</router-link
                >
              </v-list-item>
            </div>
            <div>
              <button @click="logoutUser" class="menu-item logout">
                Выйти
              </button>
            </div>
          </v-list>
        </v-menu>
      </div>
    </header>

    <div class="loader-wrap" v-show="isLogout">
      <cat-loader></cat-loader>
    </div>
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
import { mapState, mapActions } from "vuex";
import NoAccess from "@/components/admin/NoAccess.vue";
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
import CatLoader from "@/components/CatLoader.vue";
import BurgerMenu from "@/components/BurgerMenu.vue";

export default {
  data() {
    return {
      sidebarHide: false,
      isLogout: false,
      links: [{ title: "Пользователи", path: "/admin/users" }],
    };
  },
  computed: {
    getFullName() {
      return localStorage.getItem("fullName");
    },
    getUsername() {
      return localStorage.getItem("username");
    },
    getUserAvatar() {
      if (this.USER_AVATAR) {
        return `data:image/${this.USER_AVATAR.content_type};base64,${this.USER_AVATAR.base64}`;
      }
      return require("@/assets/img/no_avatar.png");
    },
    ...mapState({
      HAS_ACCESS: (state) => state.admin.hasAccess,
      ADMIN_LOADING: (state) => state.admin.adminLoading,
      USER_AVATAR: (state) => state.avatar.avatar,
    }),
  },
  methods: {
    async logoutUser() {
      try {
        this.isLogout = true;
        await this.logout();
        await this.$router.push("/");
        this.isLogout = false;
      } catch (error) {
        this.isLogout = false;

        if (error.response.status >= 500) {
          this.$router.push("/");
        }
      }
    },
    ...mapActions(["logout"]),
  },
  components: { ThemeSwitcher, NoAccess, CatLoader, BurgerMenu },
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
    max-height: 55px;
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
