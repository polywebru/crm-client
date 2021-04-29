<template>
  <div class="main-info">
    <div class="main-text-fields">
      <div class="field">
        <label for="last_name">Фамилия</label>
        <v-text-field
          outlined
          :value="getUserInfo.last_name"
          :class="{ invalid: invalidLastName }"
          :error-messages="invalidLastName"
          class="custom-input settings__input"
          @change="changeUserInfo({ type: 'last_name', data: $event })"
          id="last_name"
        ></v-text-field>
      </div>
      <div class="field">
        <label for="first_name">Имя</label>
        <v-text-field
          outlined
          :value="getUserInfo.first_name"
          id="first_name"
          :class="{ invalid: invalidFirstName }"
          :error-messages="invalidFirstName"
          class="custom-input settings__input"
          @change="changeUserInfo({ type: 'first_name', data: $event })"
        ></v-text-field>
      </div>
      <div class="field">
        <label for="middle_name">Отчество</label>
        <v-text-field
          outlined
          :value="getUserInfo.middle_name"
          id="middle_name"
          :class="{ invalid: invalidMiddleName }"
          :error-messages="invalidMiddleName"
          class="custom-input settings__input"
          @change="changeUserInfo({ type: 'middle_name', data: $event })"
        ></v-text-field>
      </div>
      <div class="field">
        <label for="username">Пользовательское имя</label>
        <v-text-field
          outlined
          :value="getUserInfo.username"
          id="username"
          :class="{ invalid: invalidUsername }"
          :error-messages="invalidUsername"
          class="custom-input settings__input"
          @change="changeUserInfo({ type: 'username', data: $event })"
        ></v-text-field>
      </div>
      <div class="field">
        <label for="gender">Пол</label>
        <v-select
          outlined
          id="gender"
          :value="getUserInfo.gender"
          @change="changeGender"
          :items="['Мужской', 'Женский']"
          class="custom-input settings__input"
        ></v-select>
      </div>
      <div class="field">
        <label for="date_birth">Дата рождения</label>
        <date-picker
          :date="getUserInfo.date_birth"
          @changeDate="changeUserInfo({ type: 'date_birth', data: $event })"
          id="date_birth"
        ></date-picker>
      </div>
      <button
        class="settings__change"
        type="submit"
        @click.prevent="changeInfo"
      >
        <span> Изменить</span>
      </button>
    </div>
    <div class="edit-photo">
      <h2 class="settings__photo-title">Фотография профиля</h2>
      <div class="profile-avatar avatar-settings">
        <div
          class="photo-load"
          @click.stop="setShowLoadMenu(!IS_SHOW_LOAD_MENU)"
        >
          <img src="@/assets/img/load_photo.svg" alt="Загрузить фото" />
        </div>
        <img class="avatar" :src="getUserAvatar" alt="" />
      </div>
      <photo-edit
        class="settings-load"
        :showMenu="IS_SHOW_LOAD_MENU"
      ></photo-edit>
    </div>
  </div>
</template>

<script>
import DatePicker from "@/components/DatePicker.vue";
import PhotoEdit from "@/components/PhotoEdit";
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
  metaInfo: {
    title: "Основная информация - PolyWeb",
  },
  mixins: [validationMixin],
  validations: {
    getUserInfo: {
      last_name: { maxLength: maxLength(255), required },
      first_name: { maxLength: maxLength(255), required },
      middle_name: { maxLength: maxLength(255) },
      username: { maxLength: maxLength(255), required },
    },
  },
  components: { DatePicker, PhotoEdit },
  computed: {
    invalidFirstName() {
      if (
        this.$v.getUserInfo.first_name.$dirty &&
        !this.$v.getUserInfo.first_name.required
      ) {
        return this.VALIDATION_ERRORS.required;
      } else if (
        this.$v.getUserInfo.first_name.$dirty &&
        !this.$v.getUserInfo.first_name.maxLength
      ) {
        return this.VALIDATION_ERRORS.maxLength;
      }
    },
    invalidLastName() {
      if (
        this.$v.getUserInfo.last_name.$dirty &&
        !this.$v.getUserInfo.last_name.required
      ) {
        return this.VALIDATION_ERRORS.required;
      } else if (
        this.$v.getUserInfo.last_name.$dirty &&
        !this.$v.getUserInfo.last_name.maxLength
      ) {
        return this.VALIDATION_ERRORS.maxLength;
      }
    },
    invalidMiddleName() {
      if (
        this.$v.getUserInfo.middle_name.$dirty &&
        !this.$v.getUserInfo.middle_name.maxLength
      ) {
        return this.VALIDATION_ERRORS.maxLength;
      }
    },
    invalidUsername() {
      if (
        this.$v.getUserInfo.username.$dirty &&
        !this.$v.getUserInfo.username.required
      ) {
        return this.VALIDATION_ERRORS.required;
      } else if (
        this.$v.getUserInfo.username.$dirty &&
        !this.$v.getUserInfo.username.maxLength
      ) {
        return this.VALIDATION_ERRORS.maxLength;
      } else if (this.RESPONSE_ERROR.username) {
        return this.RESPONSE_ERROR.username;
      }
    },
    getUserAvatar() {
      if (this.USER_AVATAR) {
        return `data:image/${this.USER_AVATAR.content_type};base64,${this.USER_AVATAR.base64}`;
      }
      return require("@/assets/img/no_avatar.png");
    },
    ...mapState({
      IS_SHOW_LOAD_MENU: (state) => state.isShowLoadMenu,
      VALIDATION_ERRORS: (state) => state.validationErrors,
      RESPONSE_ERROR: (state) => state.error,
      USER_AVATAR: (state) => state.avatar.avatar,
    }),
    ...mapGetters(["getUserInfo"]),
  },
  methods: {
    changeInfo() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit("changeInfo", "main-info");
      }
    },
    changeGender(gender) {
      const changedGender =
        gender === "Мужской" ? "male" : gender === "Женский" ? "female" : "";
      this.changeUserInfo({ type: "gender", data: changedGender });
    },

    ...mapMutations(["changeUserInfo", "setShowLoadMenu"]),
  },
};
</script>
<style lang="scss" >
.main-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  @media (max-width: 970px) {
    flex-direction: column;
    align-items: center;
  }
  .main-text-fields {
    width: 70%;
    @media (max-width: 970px) {
      width: 100%;
    }
  }
}
.profile-avatar.avatar-settings {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  position: relative;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 10px;
  &:hover {
    .photo-load {
      display: flex;
      cursor: pointer;
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
.edit-photo {
  @media (max-width: 970px) {
    order: -1;
    left: unset !important;
  }
  position: relative;
  bottom: 25px;
  left: 20px;
}
.photo-load-menu.settings-load {
  top: 70% !important;
  @media (max-width: 970px) {
    left: 50% !important;
    transform: translateX(-50%);
  }
}
</style>