<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    content-class="picker__menu"
    offset-y
    min-width="300px"
    top
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="dateFormatted"
        outlined
        v-mask="'##.##.####'"
        label="дд.мм.гггг"
        single-line
        class="datepicker custom-input"
        v-bind="attrs"
        v-on="on"
        @input="pickDate = parseDate(dateFormatted)"
      ></v-text-field>
    </template>
    <v-date-picker
      first-day-of-week="1"
      no-title
      ref="picker"
      v-model="pickDate"
      :max="maxDate"
      min="1970-01-01"
      @change="save"
    ></v-date-picker>
  </v-menu>
</template>
<script>
import { format } from "date-fns";
export default {
  props: {
    date: String,
  },
  data() {
    return {
      changedDate: "",
      pickDate: new Date().toLocaleDateString().split(".").reverse().join("-"),
      dateFormatted: this.date,
      menu: false,
    };
  },
  computed: {
    maxDate() {
      return new Date().toLocaleDateString().split(".").reverse().join("-");
    },
  },
  methods: {
    save(date) {
      this.changedDate = date;
      this.$emit("changeDate", date);
      this.menu = false;
      this.dateFormatted = format(new Date(date), "dd.MM.yyyy");
    },
    parseDate(date) {
      this.menu = false;
      if (!date) {
        this.changedDate = "";
        this.menu = true;
        return format(new Date(), "yyyy-MM-dd");
      }
      const [day, month, year] = date.split(".");
      if (month > 12 || month < 1 || day < 1 || day > 31) {
        return format(new Date(), "yyyy-MM-dd");
      }
      if (year > 1000 && day && month) {
        const inputDate = `${year}-${month}-${day}`;
        this.changedDate = inputDate;
        this.$emit("changeDate", this.changedDate);
        return inputDate;
      } else {
        this.changedDate = "";
      }
      return format(new Date(), "yyyy-MM-dd");
    },
  },
};
</script>
<style lang="scss" >
@import "@/assets/styles/_variables.scss";

.picker__menu {
  background-color: var(--main-bg) !important;
  ul {
    scrollbar-color: $blue #cacaca;
    &::-webkit-scrollbar-thumb {
      transition: 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
      background-color: $blue !important;
      position: relative;
      border-radius: 1px;
    }
    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
      position: relative;
      z-index: -1;
    }
  }
}
.v-btn--active {
  color: $blue !important;
}
.v-date-picker-years {
  li {
    color: var(--text-color) !important;
    &.active {
      color: $blue !important;
    }
  }
}
.v-picker {
  background-color: var(--main-bg) !important;
  .accent--text {
    button {
      color: var(--text-color) !important;
    }
  }
  &__body {
    background-color: var(--main-bg) !important;
    button.v-btn.v-btn--disabled {
      i.v-icon {
        color: #bbb !important;
      }
    }
    button.v-btn {
      i.v-icon {
        color: var(--text-color) !important;
      }
    }
    th {
      color: var(--text-color) !important;
      &:last-child,
      &:nth-child(6) {
        color: red !important;
      }
    }
    td {
      button.v-btn:not(.v-btn--disabled):not(.v-btn--active)
        div.v-btn__content {
        color: var(--text-color) !important;
      }
      button.v-btn.v-btn--disabled {
        color: #aaa !important;
      }
    }
  }
}
</style>