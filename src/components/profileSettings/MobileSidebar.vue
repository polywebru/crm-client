<template>
  <div class="settings__sidebar--mobile">
    <v-menu tile content-class="settings__menu" offset-y left>
      <template v-slot:activator="{ attrs, on }">
        <div class="settings__menu-opener" v-bind="attrs" v-on="on">
          <h1>Настройки профиля</h1>
          <div class="arrow">
            <svg
              width="14"
              height="9"
              viewBox="0 0 15 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.0441427 2.20165L1.40498 0.909147L7.49998 6.73915L13.595 0.909147L14.9558 2.20165L7.49998 9.33331L0.0441427 2.20165Z"
                class="arrow__path"
              />
            </svg>
          </div>
        </div>
      </template>
      <v-list>
        <div>
          <v-list-item v-for="(link, index) in links" :key="index">
            <router-link
              exact
              exact-active-class="header__menu-link--active"
              class="header__menu-link menu-item"
              :to="link.path"
              >{{ link.title }}</router-link
            >
          </v-list-item>
        </div>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
export default {
  props: {
    links: Array,
  },
};
</script>
