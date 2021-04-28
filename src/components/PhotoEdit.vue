<template>
  <div class="photo-load-menu" :class="{ show: showMenu }">
    <label class="upload-photo" for="file">
      {{ photoChangeTitle }} фотографию
    </label>
    <input
      type="file"
      class="file-input"
      id="file"
      ref="avatar"
      @change="handleAvatarUpload"
    />
    <button @click="handleAvatarDelete" class="delete-photo" v-if="USER_AVATAR">
      <span>Удалить фотографию</span>
    </button>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  props: {
    showMenu: Boolean,
  },
  data() {
    return {
      file: "",
    };
  },
  computed: {
    photoChangeTitle() {
      return this.USER_AVATAR ? "Изменить" : "Загрузить";
    },
    ...mapState({
      USER_AVATAR: (state) => state.avatar.avatar,
    }),
  },
  methods: {
    ...mapActions(["uploadAvatar", "deleteAvatar"]),
    async handleAvatarUpload() {
      this.file = this.$refs.avatar.files[0];
      let formData = new FormData();
      formData.append("avatar", this.file);
      try {
        await this.uploadAvatar(formData);
      } catch (e) {
        if (e === 401) {
          localStorage.clear();
          await this.$router.push({ name: "Login" });
        } else {
          this.$emit("showAlert");
        }
      }
    },
    async handleAvatarDelete() {
      try {
        await this.deleteAvatar();
      } catch (error) {
        if (error === 401) {
          localStorage.clear();
          await this.$router.push({ name: "Login" });
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
.upload-photo {
  cursor: pointer;
  font-weight: 600;
  font-size: 14px !important;
  color: var(--text-color);
}
.file-input {
  opacity: 0;
  position: absolute;
  z-index: -1;
  width: 0;
}
.delete-photo {
  margin-top: 15px;
}
.photo-load-menu {
  &.show {
    display: flex;
  }
  background-color: var(--menu-bg);
  position: absolute;
  z-index: 1000;
  display: none;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 15px;
  width: 191px;
  border: 1px solid #aaaaaa;
  border-radius: 10px;
  top: 100%;
  margin-top: 40px;
  span {
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    color: #ff0000;
  }
}
</style>