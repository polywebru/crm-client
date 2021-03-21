<template>
  <div>
    <label for="abilities">Навыки</label>
    <v-combobox
      v-model.trim="skills"
      label="Перечислите через запятую"
      deletable-chips
      single-line
      :delimiters="[',']"
      hide-details
      hide-no-data
      clearable
      small-chips
      class="abilities custom-input"
      background-color="#fff"
      outlined
      multiple
      id="abilities"
    >
      <template v-slot:selection="{ attrs, item, selected }">
        <v-chip
          v-bind="attrs"
          :input-value="selected"
          close
          @click:close="remove(item)"
        >
          <strong>{{ item }}</strong
          >&nbsp;
        </v-chip>
      </template>
    </v-combobox>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      skills: [],
    };
  },
  created() {
    this.skills = this.USER_SKILLS.map((skill) => skill.name);
  },
  computed: mapState({ USER_SKILLS: (state) => state.auth.user.skills }),
  methods: {
    remove(item) {
      this.skills.splice(this.skills.indexOf(item), 1);
      this.skills = [...this.skills];
    },
  },
  watch: {
    skills(val) {
      val = val.map((skill) => ({ name: skill }));
      this.$emit("updateSkills", val);
    },
  },
};
</script>
<style lang="scss" scoped>
.custom-input {
  @media (max-width: 1140px) {
    max-width: 256px;
  }
}
</style>