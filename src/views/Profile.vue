<template>
  <div class="profile-wrapper">
    <cat-loader v-if="IS_LOADING"></cat-loader>
    <in-active-user v-else-if="!IS_LOADING && INACTIVE"></in-active-user>
    <div v-else class="profile-bg">
      <div class="profile-head">
        <div class="profile-avatar">
          <div
            class="photo-load"
            v-if="isMe"
            @click.stop="setShowLoadMenu(!IS_SHOW_LOAD_MENU)"
          >
            <img src="@/assets/img/load_photo.svg" alt="Загрузить фото" />
          </div>
          <img class="avatar" :src="getUserAvatar" id="avatar" alt="" />
        </div>
        <photo-edit :showMenu="IS_SHOW_LOAD_MENU"></photo-edit>
      </div>
      <main class="profile-main">
        <div class="profile-info">
          <h2 class="profile-full-name">{{ getFullName }}</h2>
          <h3 class="profile-status">{{ getUserStatus }}</h3>
          <h3 class="profile-faculty">{{ getFacultyName }}</h3>
          <h3 class="profile-speciality">{{ getSpecialityName }}</h3>
        </div>
        <div class="profile-skills" v-if="hasSkills">
          <ul class="skills-list">
            <skill
              v-for="(skill, index) in USER_INFO.skills"
              :key="index"
              :index="index"
              >{{ skill && skill.name }}</skill
            >
          </ul>
        </div>
        <div class="profile-resources">
          <div class="change-view">
            <button @click="isGrid = !isGrid">
              <img
                v-if="!isGrid"
                src="@/assets/img/grid.svg"
                alt="В две колонки"
              />
              <img v-else src="@/assets/img/lines.svg" alt="В одну колонку" />
            </button>
          </div>
          <div class="profile-contacts">
            <contacts :hasUserPhone="hasUserPhone">
              <template #phone>{{ getUserPhone | phoneFilter }}</template>
              <template #email>{{ getUserEmail }}</template>
            </contacts>
            <links :links="USER_INFO.links"></links>
          </div>
        </div>
        <div class="activities">
          <user-activity
            :userActivity="{ title: 'Проекты', name: 'project' }"
            :activities="projects"
            :isGrid="isGrid"
          ></user-activity>
          <user-activity
            :userActivity="{ title: 'Компетенции', name: 'competence' }"
            :activities="competences"
            :isGrid="isGrid"
          ></user-activity>
        </div>
      </main>
    </div>
  </div>
</template>
<script>
import Skill from "@/components/profile/Skill";

import SkeletonLoader from "@/components/profile/SkeletonLoader";
import UserActivity from "@/components/profile/UserActivity.vue";
import Contacts from "@/components/profile/Contacts";
import Links from "@/components/profile/UserLinks";
import PhotoEdit from "@/components/PhotoEdit";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import userDataMixin from "@/mixins/userData.mixin";
import CatLoader from "@/components/CatLoader.vue";

export default {
  metaInfo() {
    return {
      title: `${this.getFullName || "CRM"} - PolyWeb`,
      htmlAttrs: {
        lang: "ru",
      },
    };
  },
  mixins: [userDataMixin],
  data() {
    return {
      projects: [],
      competences: [],
      isGrid: false,
    };
  },
  computed: {
    getFullName() {
      if (Object.keys(this.USER_INFO).length) {
        return `${this.USER_INFO?.last_name || ""}
              ${this.USER_INFO?.first_name || ""}
              ${this.USER_INFO?.middle_name || ""}`;
      }
      return null;
    },
    getFacultyName() {
      return this.USER_INFO?.faculty?.name;
    },
    getSpecialityName() {
      return this.USER_INFO?.speciality?.profile;
    },
    getUserStatus() {
      return this.USER_INFO?.status === "intern" ? "Стажёр" : "Сотрудник";
    },
    hasUserPhone() {
      return !!this.USER_INFO?.phone;
    },
    getUserPhone() {
      return this.hasUserPhone && this.USER_INFO?.phone;
    },
    isMe() {
      return localStorage.getItem("username") === this.$route.params.username;
    },
    hasSkills() {
      if (this.USER_INFO?.skills) {
        return Object.keys(this.USER_INFO?.skills).length;
      }
    },

    getUserEmail() {
      return this.USER_INFO?.email;
    },
    getUserAvatar() {
      if (this.USER_INFO.avatar) {
        return `data:image/${this.USER_INFO.avatar.content_type};base64,${this.USER_INFO.avatar.base64}`;
      }
      return require("@/assets/img/no_avatar.png");
    },
    ...mapState({
      INACTIVE: (state) => state.inActiveUser,
      USER_AVATAR: (state) => state.avatar.avatar,
      USER_INFO: (state) => state.profile.userInfo,
    }),
    ...mapGetters({ HAS_ROLES_AND_PERMISSIONS: ["hasRolesAndPermissions"] }),
  },
  methods: {
    ...mapMutations(["setShowLoadMenu"]),
    ...mapActions(["getUserInfo", "getRolesAndPermissions"]),
  },
  components: {
    Skill,
    SkeletonLoader,
    UserActivity,
    Contacts,
    Links,
    PhotoEdit,
    CatLoader,
  },
};
</script>
<style lang="scss">
@import "@/assets/styles/_variables.scss";
.profile-bg {
  background-color: var(--main-bg);
}
.clip-loader {
  z-index: 20000;
}
.v-spinner {
  position: absolute !important;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.profile-wrapper {
  position: relative;
  height: 100vh;
  background-color: var(--main-bg);
  &.inactive {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
  }
}
.profile-head {
  position: relative;
  padding-top: 0;
  background-color: var(--layout-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  position: relative;
  top: 55px;
  &:hover {
    .photo-load {
      display: flex;
    }
  }
  img.avatar {
    width: 120px;
    object-fit: cover;
    height: 120px;
    border: 4px solid #fff;
    border-radius: 50%;
  }
  .photo-load {
    position: absolute;
    cursor: pointer;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
    display: none;
    justify-content: center;
    align-items: center;
    img {
      width: 41px;
      height: 36px;
    }
  }
}

.profile-info {
  margin-top: 76px;
  text-align: center;
  h2,
  h3 {
    color: var(--text-color);
  }
}
.profile-full-name {
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
}
.profile-faculty {
  margin-top: 14px;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
}
.profile-speciality {
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
}
.profile-skills {
  display: flex;
  justify-content: center;
  margin: 25px auto 0;
  flex-wrap: wrap;
  max-width: 722px;
}
.skills-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 722px;
}
.profile-resources {
  display: flex;
  justify-content: space-between;
  .change-view {
    margin-left: 20px;
    button {
      outline: none;
    }
    @media (max-width: 480px) {
      display: none;
    }
  }
  .profile-contacts {
    display: flex;

    div {
      color: var(--text-color);
    }
  }
  @media (max-width: 480px) {
    justify-content: space-around;
  }
}
.profile-status {
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  margin-top: 10px;
}

.menu-title {
  margin-right: 10px;
  font-size: 14px !important;
  line-height: 19px;
  @media (max-width: 320px) {
    font-size: 12px !important;
    margin-right: 0;
  }
}

.activities {
  display: flex;
  justify-content: space-around;
  margin-top: 22px;
  @media (max-width: 780px) {
    flex-direction: column;
  }
  & > div {
    width: 48.5%;
    @media (max-width: 780px) {
      width: 100%;
      margin-bottom: 20px;
    }
  }
}
.success-alert {
  background-color: rgb(10, 209, 10) !important;
  max-width: 200px;
  position: absolute;
  cursor: default;
  top: 25px;
  transition: 0.2s;
  opacity: 0;
  z-index: -1000;
  &.show {
    opacity: 1;
    z-index: 1000;
    transition: 0.2s;
  }
  left: 50%;
  transform: translateX(-50%);
  div {
    color: white !important;
    &:nth-child(2) {
      margin-left: 10px;
      margin-right: 20px;
    }
  }
}
</style>
