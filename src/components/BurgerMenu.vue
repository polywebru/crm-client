<template>
  <v-menu offset-y class="custom-menu burger">
    <template v-slot:activator="{ attrs, on }">
      <button class="burger" color="#414dbb" v-bind="attrs" v-on="on">
        <span class="line" v-for="line in 3" :key="line"></span>
      </button>
    </template>

    <v-list>
      <div class="header__private-info menu-item">
        <div>{{ name }}</div>
        <div class="header__username">
          {{ username }}
        </div>
      </div>
      <v-list-item v-for="(link, index) in links" :key="index">
        <router-link
          exact
          exact-active-class="header__menu-link--active"
          class="header__menu-link menu-item"
          :to="link.path"
          >{{ link.title }}</router-link
        >
      </v-list-item>
      <div>
        <button @click.stop="logoutUser" class="menu-item logout">Выйти</button>
      </div>
    </v-list>
  </v-menu>
</template>

<script>
import { createNamespacedHelpers, mapActions } from "vuex";

const { mapGetters } = createNamespacedHelpers("mainLayout");

export default {
  props: {
    name: String,
    username: String,
    role: String,
  },
  computed: {
    ...mapGetters({ LINKS: ["links"] }),
    links() {
      return [...this.LINKS(true), ...this.LINKS(false)];
    },
  },
  methods: {
    async logoutUser() {
      try {
        await this.logout();
        await this.$router.push("/");
      } catch (error) {}
    },
    ...mapActions(["logout"]),
  },
};
</script>
<style lang="scss" scoped>
.burger {
  display: none;
  width: 40px;
  height: 40px;
  position: relative;
  outline: none;
  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &[aria-expanded="true"] {
    .line {
      &:first-child {
        transform: rotate(45deg);
        transition: 0.3s;
        position: absolute;
      }
      &:nth-child(2) {
        position: absolute;
        transition: 0.3s;
        transform: rotate(-45deg);
      }
      &:last-child {
        display: none;
      }
    }
  }
}
.line {
  display: block;
  width: 30px;
  transition: 0.3s;

  height: 3px;
  border-radius: 2px;
  background-color: #fff;
  &:nth-child(2) {
    margin: 5px 0;
  }
}
.role--mobile {
  color: #000;
  margin-left: 244px;
}
.v-menu__content {
  max-width: unset !important;
  @media (max-width: 480px) {
    left: 0 !important;
  }
}
</style>