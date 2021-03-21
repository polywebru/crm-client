<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="auto"
    top
  >
    <template v-slot:activator="{ on, attrs }">
      <label for="date">{{ nameDatePicker }}</label>
      <v-text-field
        v-model="date"
        class="custom-input mt-1 datepicker"
        :class="{ invalid: isInvalid }"
        background-color="#fff"
        outlined
        readonly
        :placeholder="nameDatePicker"
        v-bind="attrs"
        v-on.prevent="on"
      ></v-text-field>
    </template>
    <v-date-picker
      ref="picker"
      v-model="pickDate"
      locale="ru"
      no-title
      :max="new Date().toISOString().substr(0, 10)"
      :min="minDate"
      @change="save"
    ></v-date-picker>
  </v-menu>
</template>
<script>
import { format } from "date-fns";
import { mapState } from "vuex";
export default {
  props: {
    nameDatePicker: String,
    isBirthdate: {
      type: Boolean,
      default: true,
    },
    isInvalid: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      pickDate: null,
      menu: false,
      date: null,
    };
  },
  created() {
    if (this.USER_BIRTHDATE && this.isBirthdate) {
      this.pickDate = this.USER_BIRTHDATE;
    } else if (this.USER_START_STUDYING) {
      this.pickDate = this.USER_START_STUDYING;
    }
  },
  computed: {
    ...mapState({
      USER_BIRTHDATE: (state) => state.auth.user?.date_birth,
      USER_START_STUDYING: (state) => state.auth.user?.study_begin_date,
    }),
    minDate() {
      return this.isBirthdate ? "1980-01-01" : "2015-01-01";
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
    pickDate(val) {
      this.date = format(new Date(val), "dd.MM.yyyy");
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
      this.$emit("selectDate", format(new Date(this.pickDate), "yyyy-MM-dd"));
    },
  },
};
</script>
