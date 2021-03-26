<template>
  <div class="links">
    <v-menu max-width="300px" offset-y>
      <template v-slot:activator="{ attrs, on }">
        <div class="links-opener" v-bind="attrs" v-on="on">
          <div class="menu-title">Ссылки</div>
          <div class="arrow">
            <svg
              class="arrow-vector"
              viewBox="0 0 15 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.0441427 2.20165L1.40498 0.909147L7.49998 6.73915L13.595 0.909147L14.9558 2.20165L7.49998 9.33331L0.0441427 2.20165Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
      </template>
      <ul class="links-items" v-if="links && links.length > 0">
        <li v-for="(link, index) in links" :key="index">
          <a :href="`${link.url}`" class="links-item">
            <span v-once
              ><img
                :src="require(`@/assets/img/link_icons/${link.type}.svg`)"
                :alt="`${link.type}`"
            /></span>
            <span>{{ getLinkName[index] }}</span>
          </a>
        </li>
      </ul>
      <span class="no-links" v-else>Ссылок пока нет</span>
    </v-menu>
  </div>
</template>
<script>
export default {
  props: {
    links: Array,
  },
  computed: {
    /**@return {Array} - shortNames of links*/

    getLinkName() {
      return this.links.map((link) => {
        if (link.type !== "other") {
          const shortNameUrl = link.url.replace(
            /https?:\/\/[a-z.]{1,}\/?/i,
            ""
          );
          return shortNameUrl.indexOf("/") !== -1
            ? `@${shortNameUrl.slice(0, shortNameUrl.indexOf("/"))}`
            : `@${shortNameUrl}`;
        }
        return link.url;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.links {
  margin-right: 42px;
  @media (max-width: 480px) {
    margin-right: 0;
  }
  &-opener {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    .arrow {
      transition: 0.3s;
      &-vector {
        width: 15px;
        height: 10px;
        @media (max-width: 320px) {
          margin-left: 5px;

          width: 9px;
          height: 7px;
        }
      }
    }
    &[aria-expanded="true"] {
      .arrow {
        transform: rotate(180deg);
        transition: 0.3s;
      }
    }
  }
  &-item {
    display: flex;
    align-items: center;
    padding: 10px 10px 5px;
    transition: 0.3s;
    &:hover {
      background-color: #f5f5f5;
      transition: 0.3s;
    }
    span:nth-child(2) {
      margin-left: 20px;
      align-self: flex-start;
      margin-top: 3px;
    }
  }
  &-items {
    list-style: none;
  }
}
.v-menu__content {
  max-width: 200px !important;
  @media (max-width: 480px) {
    left: 66% !important;
    transform: translateX(-50%);
  }
}
.no-links {
  display: inline-block;
  padding: 20px;
}
</style>