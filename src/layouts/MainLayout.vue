<template>
  <div
    class="wrap"
    data-app="true"
    @click="IS_SHOW_LOAD_MENU && setShowLoadMenu(false)"
  >
    <div class="loader-wrap" v-if="isLogout">
      <cat-loader></cat-loader>
    </div>

    <server-error-alert :showAlert="showAlert"></server-error-alert>
    <skeleton-laoder v-show="IS_LOADING"></skeleton-laoder>
    <header class="header" v-show="!IS_LOADING">
      <div class="header__info">
        <router-link class="header__logo" :to="'/'">
          <img src="@/assets/img/logo.png" alt="logo" />
        </router-link>
        <nav class="header__nav" v-if="IS_USER_ACTIVE">
          <router-link
            class="header__link"
            v-for="(link, index) in HEADER_LINKS(true)"
            :key="index"
            :to="link.path"
            >{{ link.title }}</router-link
          >
        </nav>
      </div>
      <burger-menu
        @changeIsLogout="changeIsLogout"
        :isActiveUser="IS_USER_ACTIVE"
        :name="getFullName"
        :username="getUsername"
      ></burger-menu>
      <v-menu tile max-width="300px" offset-y left>
        <template v-slot:activator="{ attrs, on }">
          <div class="menu-opener" color="#414dbb" v-bind="attrs" v-on="on">
            <div class="menu-avatar">
              <img src="@/assets/img/no_avatar.png" alt="" />
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
          <div v-if="IS_USER_ACTIVE">
            <v-list-item
              v-for="(link, index) in HEADER_LINKS(false)"
              :key="index"
            >
              <router-link
                exact
                exact-active-class="header__menu-link--active"
                class="header__menu-link menu-item"
                :to="link.path"
                >{{ link.title }}</router-link
              >
            </v-list-item>
          </div>
          <div>
            <button @click.stop="logoutUser" class="menu-item logout">
              Выйти
            </button>
          </div>
        </v-list>
      </v-menu>
    </header>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapMutations, mapGetters, mapState, mapActions } from "vuex";
import BurgerMenu from "@/components/BurgerMenu.vue";
import SkeletonLaoder from "./SkeletonLaoder.vue";
import ServerErrorAlert from "@/components/ServerErrorAlert.vue";
import InActiveUser from "@/components/InActiveUser.vue";
import CatLoader from "@/components/CatLoader.vue";
export default {
  data() {
    return {
      showAlert: false,
      isLogout: false,
    };
  },
  mounted() {
    this.$on("showAlert", this.visibleAlert);
  },
  components: {
    BurgerMenu,
    SkeletonLaoder,
    ServerErrorAlert,
    InActiveUser,
    CatLoader,
  },
  computed: {
    getFullName() {
      return `${this.LAYOUT_INFO.firstName} ${this.LAYOUT_INFO.lastName}`;
    },
    getUsername() {
      return this.LAYOUT_INFO.username;
    },
    ...mapGetters({
      HEADER_LINKS: ["mainLayout/links"],
      LAYOUT_INFO: ["mainLayoutInfo"],
    }),
    ...mapState({
      IS_LOADING: (state) => state.profile.isLoading,
      IS_SHOW_LOAD_MENU: (state) => state.isShowLoadMenu,
      IS_USER_ACTIVE: (state) => state.profile.userInfo.is_active,
    }),
  },
  methods: {
    changeIsLogout() {
      console.log("ok");
      this.isLogout = true;
    },
    async logoutUser() {
      this.isLogout = true;
      try {
        await this.logout();
        await this.$router.push("/");
        this.isLogout = false;
      } catch (error) {
        this.isLogout = false;

        if (error.response.status >= 500) {
          this.visibleAlert();
          this.$router.push("/");
        }
      }
    },
    visibleAlert() {
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 1300);
    },
    ...mapMutations(["setShowLoadMenu"]),
    ...mapActions(["logout"]),
  },
};
</script>
<style lang="scss"  >
@import "@/assets/styles/_variables.scss";
.loader-wrap {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba($color: #fff, $alpha: 0.5);
}

.alert-custom {
  top: 50px;
  left: 50% !important;
  transform: translateX(-50%);
}
.header {
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  align-items: center;
  max-height: 60px;
  background-color: $layout-bg;
  position: relative;
  z-index: 1;
  @media (max-width: 480px) {
    padding: 5px 30px;
  }
  &__nav {
    align-self: flex-start;
    margin-top: 7px;
    @media (max-width: 480px) {
      display: none;
    }
  }
  &__info {
    display: flex;
    align-items: center;
  }
  &__profile {
    max-width: 70px;
  }
  &__logo {
    margin-right: 40px;
    @media (max-width: 768px) {
      margin-right: 27px;
    }
  }
  &__link {
    font-weight: 700;
    font-size: 14px;
    line-height: 19px;
    color: $white;
    position: relative;
    &::after {
      content: "";
      height: 2px;
      width: 0;
      display: block;
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      background-color: $white;
      margin-top: 7px;
      transition: 0.3s;
    }
    &:hover::after {
      width: 100%;
      transition: 0.3s;
    }
    &:nth-child(2) {
      margin: 0 47px;
      @media (max-width: 768px) {
        margin: 0 27px;
      }
    }
  }
  &__private-info {
    background-color: #fff;
    padding: 20px 10px 15px;
    padding-left: 20px;
    border-bottom: 2px solid #c4c4c4;
  }
  &__name {
    font-weight: 700;
    font-size: 16px;
    max-width: 225px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &__username {
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    max-width: 225px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.menu-item {
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  &.header__menu-link {
    font-size: 14px !important;
    transition: 0.3s;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    padding: 15px 20px;
    &--active {
      background-color: #f6f6f6;
    }
    &:hover {
      background-color: #f6f6f6;
      transition: 0.3s;
    }
  }
}
.menu-opener {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  @media (max-width: 480px) {
    display: none;
  }
  .arrow {
    transition: 0.3s;
  }
  .menu-avatar {
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    img {
      object-fit: cover;
      border-radius: 50%;
      width: 45px;
      height: 45px;
      border: 4px solid transparent;
    }
  }
  &[aria-expanded="true"] {
    .arrow {
      transform: rotate(180deg);
      transition: 0.3s;
    }
    .menu-avatar {
      img {
        border-color: #8f8bea;
      }
    }
  }
}
.menu-avatar {
  margin-right: 10px;
}
.role {
  color: $white;
  margin-right: 30px;
  @media (max-width: 480px) {
    display: none;
  }
}
.v-menu__content {
  box-shadow: none;
  border: 1px solid #b0b0b0;
  background-color: $white;
  border-radius: 5px;
  width: 100%;
  left: 300px;
  .v-list {
    padding: 0;
  }
  margin-top: 0;
  max-width: 300px !important;
  @media (max-width: 480px) {
    left: 0 !important;
    max-width: unset !important;
  }
}
.logout {
  color: rgb(255, 65, 65);
  width: 100%;
  font-size: 14px;
  text-align: left;
  padding: 15px 20px;
  outline: none;
  transition: 0.3s;
  &:hover {
    background-color: #f6f6f6;
    transition: 0.3s;
  }
}
</style>