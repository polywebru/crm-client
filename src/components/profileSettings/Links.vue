<template>
  <div class="links-info">
    <div class="links-text-fields">
      <div class="link-field" v-for="(link, index) in userLinks" :key="index">
        <v-select
          outlined
          :value="link.type"
          append-icon=""
          :items="linkTypes"
          item-value="type"
          item-text="name"
          @change="changeLinkType(link, $event)"
          class="settings__input link-type"
        >
          <template #selection="{ item }">
            <span class="item-name">
              {{ item.name }}
            </span>
          </template>
          <template #item="{ item }">
            <div class="links-item">
              <img :src="item.icon" alt="" />
              <span class="link-name">
                {{ item.name }}
              </span>
            </div>
          </template>
        </v-select>
        <v-text-field
          outlined
          :value="link.url"
          :autofocus="index === userLinks.length - 1"
          @change="changeUrl($event, link)"
          class="custom-input settings__input link-url"
        ></v-text-field>
        <div class="link-actions">
          <button
            class="rise action"
            type="submit"
            v-if="index === userLinks.length - 1"
            @click.prevent="userLinks.push({ type: '', url: '' })"
          >
            +
          </button>
          <button
            type="button"
            class="reduce action"
            v-if="index !== userLinks.length - 1"
            @click="deleteLink(index)"
          >
            -
          </button>
        </div>
      </div>
      <button
        class="settings__change"
        type="button"
        @click.prevent="changeInfo"
      >
        <span> Изменить</span>
      </button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import { parseDomain, fromUrl } from "parse-domain";
export default {
  metaInfo: {
    title: "Ссылки - PolyWeb",
  },

  data() {
    return {
      linkTypes: [
        {
          name: "ВКонакте",
          type: "vk",
          icon: require("@/assets/img/link_icons/vk.svg"),
          protocol: "https://vk.com/",
        },
        {
          name: "Facebook",
          type: "fb",
          icon: require("@/assets/img/link_icons/fb.svg"),
          protocol: "https://facebook.com/",
        },
        {
          name: "Telegram",
          type: "tg",
          icon: require("@/assets/img/link_icons/tg.svg"),
          protocol: "https://t.me/",
        },
        {
          name: "Одноклассники",
          type: "ok",
          icon: require("@/assets/img/link_icons/ok.svg"),
          protocol: "https://ok.ru/",
        },
        {
          name: "GitHub",
          type: "gh",
          icon: require("@/assets/img/link_icons/gh.svg"),
          protocol: "https://github.com/",
        },
        {
          name: "Другое",
          type: "other",
          icon: require("@/assets/img/link_icons/other.svg"),
          protocol: "https://",
        },
      ],
      userLinks: [],
    };
  },
  created() {
    if (this.getUserInfo.links) {
      this.userLinks = [...this.getUserInfo.links];
      this.userLinks.push({ type: "", url: "" });
    }
  },
  computed: {
    ...mapState({ LINKS: (state) => state.profile.userInfo.links }),
    ...mapGetters(["getUserInfo"]),
  },
  methods: {
    deleteLink(index) {
      this.removeLink(index);
      this.userLinks.splice(index, 1);
    },
    changeLinkType(link, type) {
      const protocol =
        this.linkTypes.find((linkType) => linkType.type === type)?.protocol ||
        "";
      link.type = type;
      link.url = protocol;
    },
    changeUrl(url, link) {
      let { domain } = parseDomain(fromUrl(url));
      switch (domain) {
        case "t":
          domain = "tg";
          break;
        case "github":
          domain = "gh";
          break;
        case "facebook":
          domain = "fb";
          break;
      }
      if (!link.type) {
        link.type =
          this.linkTypes.find((linkType) => linkType.type === domain)?.type ||
          "other";
      }
      const protocol =
        this.linkTypes.find((linkType) => linkType.type === link.type)
          ?.protocol || "";
      if (url.includes(protocol)) {
        link.url = url;
      } else if (url) {
        link.url = protocol + url;
      } else {
        link.url = "";
        link.type = "";
      }
    },
    changeInfo() {
      this.userLinks = this.userLinks.filter(
        (link, index, links) => link.url !== "" || index == links.length - 1
      );
      this.changeUserInfo({
        type: "links",
        data: this.userLinks.slice(0, this.userLinks.length - 1),
      });
      this.$emit("changeInfo", "links");
    },
    ...mapMutations(["changeUserInfo", "removeLink"]),
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.link-field {
  display: flex;
  align-items: center;
  .link-actions {
    display: flex;
    align-items: center;
  }
  .rise {
    padding: 5px 13px !important;
  }
  .action {
    font-size: 18px;
    border-radius: 5px;
    padding: 5px 15px;
    border: 2px solid $blue;
    margin-top: 20px;
    margin-left: 20px;
    outline: transparent;
    color: var(--text-color);
    transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
    &:hover {
      color: #fff;
      background-color: $blue;
      transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
    }
  }

  .item-name {
    max-width: 51px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.links-item {
  width: 100%;
  display: flex;
  align-items: center;
  span {
    margin-left: 10px;
  }
}
</style>