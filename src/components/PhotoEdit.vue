<template>
  <div class="photo-load-menu" :class="{ show: showMenu }">
    <label class="upload-photo" for="file-input">
      {{ photoChangeTitle }} фотографию
    </label>
    <input type="file" class="file-input" id="file-input" />
    <button class="delete-photo" v-if="USER_AVATAR">
      <span>Удалить фотографию</span>
    </button>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    showMenu: Boolean,
  },
  computed: {
    photoChangeTitle() {
      return this.USER_AVATAR ? "Изменить" : "Загрузить";
    },
    ...mapState({ USER_AVATAR: (state) => state.profile.userInfo.avatar }),
  },
};
</script>
<style lang="scss" scoped>
.upload-photo {
  cursor: pointer;
  font-weight: 600;
  font-size: 14px !important;
}
.file-input {
  opacity: 0;
  position: absolute;
  z-index: -1;
}
.delete-photo {
  margin-top: 15px;
}
.photo-load-menu {
  &.show {
    display: flex;
  }
  background-color: #fff;
  position: absolute;
  z-index: 1000;
  display: none;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 15px;
  max-width: 241px;
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