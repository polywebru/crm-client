<template>
  <div class="skills-info">
    <div class="skills-text-fields">
      <div
        class="skill-field"
        v-for="(skill, index) in userSkills"
        :key="index"
      >
        <v-text-field
          outlined
          v-model="skill.name"
          maxLength="255"
          :autofocus="index === userSkills.length - 1"
          class="custom-input settings__input link-url"
        ></v-text-field>
        <div class="link-actions">
          <button
            class="rise action"
            type="submit"
            v-if="index === userSkills.length - 1"
            @click.prevent="userSkills.push({ name: '' })"
          >
            +
          </button>
          <button
            type="button"
            class="reduce action"
            v-if="index !== userSkills.length - 1"
            @click="deleteSkill(index)"
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
import { mapGetters, mapMutations } from "vuex";
export default {
  metaInfo: {
    title: "Навыки - PolyWeb",
  },
  data() {
    return {
      userSkills: [],
    };
  },

  created() {
    if (this.getUserInfo.skills) {
      this.userSkills = [...this.getUserInfo.skills];
      this.userSkills.push({ name: "" });
    }
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  methods: {
    deleteSkill(index) {
      this.removeSkill(index);
      this.userSkills.splice(index, 1);
    },
    changeInfo() {
      this.userSkills = this.userSkills.filter(
        (skill, index, skills) =>
          skill.name !== "" || index == skills.length - 1
      );
      this.changeUserInfo({
        type: "skills",
        data: this.userSkills.slice(0, this.userSkills.length - 1),
      });
      this.$emit("changeInfo", "skills");
    },
    ...mapMutations(["changeUserInfo", "removeSkill"]),
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.skill-field {
  display: flex;
  align-items: center;
  margin-top: 10px;
  .skill-actions {
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
    outline: none;
    color: var(--text-color);
    transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
    &:hover {
      color: #fff;
      background-color: $blue;
      transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
    }
  }
  .skill-url {
    min-width: 571px !important;
  }
}
</style>