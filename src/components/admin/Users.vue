<template>
  <div class="table">
    <v-data-table
      :headers="headers"
      :items="USERS"
      locale="ru-RU"
      :page="PAGE"
      :item-class="() => 'data-table-row'"
      :items-per-page="PERPAGE"
      :server-items-length="FILTERED"
      fixed-header
      :single-select="true"
      :footer-props="{
        'items-per-page-options': [10, 25, 50, 100],
        showFirstLastPage: true,
      }"
      @update:items-per-page="updateItemsPerPage"
      @update:page="updatePage"
      @update:sort-by="sortAsc($event[0])"
      @update:sort-desc="sortDesc($event[0])"
      mobile-breakpoint="796"
      no-data-text="Не найдено"
      class="elevation-1 data-table"
    >
      <template #body v-if="isFiltering">
        <users-skeleton :perPage="PERPAGE"></users-skeleton>
      </template>
      <template v-slot:[`item.status`]="{ item: user }">
        <v-dialog transition="dialog-bottom-transition" max-width="434">
          <template v-slot:activator="{ on, attrs }">
            <button class="status-btn" v-bind="attrs" v-on.stop="on">
              {{ user.status | statusFormat }}
            </button>
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-card-title>Изменить статус</v-card-title>
              <v-select
                outlined
                class="custom-input change-status"
                :value="user.status | statusFormat"
                @change="userStatus = $event"
                hide-details
                :items="['Стажер', 'Сотрудник']"
              ></v-select>
              <v-card-actions class="justify-center">
                <button
                  class="users-btn custom-btn"
                  :disabled="user.isChanging"
                  :class="{ disabled: user.isChanging }"
                  @click="statusChange(dialog, user)"
                >
                  <span v-show="!user.isChanging">Изменить</span>
                  <clip-loader
                    v-show="user.isChanging"
                    :loading="true"
                    :size="'15px'"
                    :color="'#fff'"
                  ></clip-loader>
                </button>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </template>
      <template v-slot:[`item.phone`]="{ item: user }">
        <span class="phone"> {{ user.phone | phoneFilter }}</span>
      </template>
      <template v-slot:[`item.createdAt`]="{ item: user }">
        <span>{{ user.createdAt | dateFormat }}</span>
      </template>
      <template v-slot:[`item.actions`]="{ item: user }">
        <div class="actions">
          <v-dialog
            transition="dialog-top-transition"
            max-width="350"
            content-class="activate-dialog"
          >
            <template v-slot:activator="{ on, attrs }">
              <button class="users-btn" v-on.stop="on" v-bind="attrs">
                <span>{{
                  user.isActive ? "Деактивировать" : "Активировать"
                }}</span>
              </button>
            </template>
            <template v-slot:default="dialog">
              <v-card>
                <v-card-title
                  >Вы уверены, что хотите
                  {{ user.isActive ? "деактивировать" : "активировать" }}
                  пользователя
                  <span>{{ user.firstName }} {{ user.lastName }}</span
                  >?</v-card-title
                >
                <v-card-actions class="activate__actions">
                  <button
                    :disabled="user.isActivating"
                    :class="{ disabled: user.isActivating }"
                    class="users-btn deny-btn"
                    @click="
                      (!user.isActive && activate(user, dialog)) ||
                        deActivate(user, dialog)
                    "
                  >
                    <span v-show="!user.isActivating"> Да </span>
                    <clip-loader
                      v-show="user.isActivating"
                      :loading="true"
                      :size="'15px'"
                      :color="'#fff'"
                    ></clip-loader>
                  </button>
                  <button
                    class="users-btn deny-btn"
                    @click="dialog.value = false"
                  >
                    <span>Нет</span>
                  </button>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
          <v-dialog
            transition="dialog-bottom-transition"
            max-width="350"
            content-class="activate-dialog"
          >
            <template v-slot:activator="{ on, attrs }">
              <button v-on.stop="on" v-bind="attrs" class="table__delete">
                <svg
                  width="19"
                  height="24"
                  viewBox="0 0 19 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.90625 8.59375C6.09687 8.59375 6.27969 8.67606 6.41448 8.82257C6.54927 8.96909 6.625 9.1678 6.625 9.375V18.75C6.625 18.9572 6.54927 19.1559 6.41448 19.3024C6.27969 19.4489 6.09687 19.5312 5.90625 19.5312C5.71563 19.5312 5.53281 19.4489 5.39802 19.3024C5.26323 19.1559 5.1875 18.9572 5.1875 18.75V9.375C5.1875 9.1678 5.26323 8.96909 5.39802 8.82257C5.53281 8.67606 5.71563 8.59375 5.90625 8.59375ZM9.5 8.59375C9.69062 8.59375 9.87344 8.67606 10.0082 8.82257C10.143 8.96909 10.2188 9.1678 10.2188 9.375V18.75C10.2188 18.9572 10.143 19.1559 10.0082 19.3024C9.87344 19.4489 9.69062 19.5312 9.5 19.5312C9.30938 19.5312 9.12656 19.4489 8.99177 19.3024C8.85698 19.1559 8.78125 18.9572 8.78125 18.75V9.375C8.78125 9.1678 8.85698 8.96909 8.99177 8.82257C9.12656 8.67606 9.30938 8.59375 9.5 8.59375ZM13.8125 9.375C13.8125 9.1678 13.7368 8.96909 13.602 8.82257C13.4672 8.67606 13.2844 8.59375 13.0938 8.59375C12.9031 8.59375 12.7203 8.67606 12.5855 8.82257C12.4507 8.96909 12.375 9.1678 12.375 9.375V18.75C12.375 18.9572 12.4507 19.1559 12.5855 19.3024C12.7203 19.4489 12.9031 19.5312 13.0938 19.5312C13.2844 19.5312 13.4672 19.4489 13.602 19.3024C13.7368 19.1559 13.8125 18.9572 13.8125 18.75V9.375Z"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.8438 4.6875C18.8438 5.1019 18.6923 5.49933 18.4227 5.79235C18.1531 6.08538 17.7875 6.25 17.4062 6.25H16.6875V20.3125C16.6875 21.1413 16.3846 21.9362 15.8454 22.5222C15.3063 23.1083 14.575 23.4375 13.8125 23.4375H5.1875C4.425 23.4375 3.69373 23.1083 3.15457 22.5222C2.6154 21.9362 2.3125 21.1413 2.3125 20.3125V6.25H1.59375C1.2125 6.25 0.846867 6.08538 0.577284 5.79235C0.3077 5.49933 0.15625 5.1019 0.15625 4.6875V3.125C0.15625 2.7106 0.3077 2.31317 0.577284 2.02015C0.846867 1.72712 1.2125 1.5625 1.59375 1.5625H6.625C6.625 1.1481 6.77645 0.750671 7.04603 0.457646C7.31562 0.16462 7.68125 0 8.0625 0L10.9375 0C11.3187 0 11.6844 0.16462 11.954 0.457646C12.2235 0.750671 12.375 1.1481 12.375 1.5625H17.4062C17.7875 1.5625 18.1531 1.72712 18.4227 2.02015C18.6923 2.31317 18.8438 2.7106 18.8438 3.125V4.6875ZM3.91963 6.25L3.75 6.34219V20.3125C3.75 20.7269 3.90145 21.1243 4.17103 21.4174C4.44062 21.7104 4.80625 21.875 5.1875 21.875H13.8125C14.1937 21.875 14.5594 21.7104 14.829 21.4174C15.0985 21.1243 15.25 20.7269 15.25 20.3125V6.34219L15.0804 6.25H3.91963ZM1.59375 4.6875V3.125H17.4062V4.6875H1.59375Z"
                  />
                </svg>
              </button>
              <button
                v-on.stop="on"
                v-bind="attrs"
                class="table__delete--mobile"
              >
                <span> Удалить </span>
              </button>
            </template>
            <template v-slot:default="dialog">
              <v-card>
                <v-card-title
                  >Вы уверены, что хотите удалить пользователя
                  <span>{{ user.firstName }} {{ user.lastName }}</span
                  >?</v-card-title
                >
                <v-card-actions class="activate__actions">
                  <button
                    :disabled="user.isDeleting"
                    :class="{ disabled: user.isDeleting }"
                    class="users-btn deny-btn"
                    @click="userDelete(user)"
                  >
                    <span v-show="!user.isDeleting"> Да </span>
                    <clip-loader
                      v-show="user.isDeleting"
                      :loading="true"
                      :size="'15px'"
                      :color="'#fff'"
                    ></clip-loader>
                  </button>
                  <button
                    class="users-btn deny-btn"
                    @click="dialog.value = false"
                  >
                    <span>Нет</span>
                  </button>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </div>
      </template>
      <template v-slot:header="props">
        <tr class="custom-table-row">
          <th
            scope="col"
            v-for="(header, index) in props.props.headers"
            :key="index"
            class="filter-input text-start"
          >
            <input
              type="search"
              class="search"
              v-if="header.value !== 'status' && header.value !== 'createdAt'"
              :class="{
                phoneInput: header.value === 'phone',
                createdInput: header.value === 'createdAt',
              }"
              v-model="filters[header.value]"
              :placeholder="header.text"
            />
            <v-menu
              ref="menu"
              v-model="menu"
              v-else-if="header.value === 'createdAt'"
              :close-on-content-click="false"
              transition="scale-transition"
              content-class="picker__menu"
              offset-y
              min-width="300px"
            >
              <template v-slot:activator="{ on, attrs }">
                <input
                  v-model="dateFormatted"
                  v-mask="'##.##.####'"
                  placeholder="дд.мм.гггг"
                  class="search date"
                  v-bind="attrs"
                  v-on="on"
                  @input="date = parseDate(dateFormatted)"
                />
              </template>
              <v-date-picker
                first-day-of-week="1"
                no-title
                ref="picker"
                v-model="date"
                :max="date"
                min="2018-01-01"
                @change="save"
              ></v-date-picker>
            </v-menu>
            <v-select
              v-else-if="header.value === 'status'"
              outlined
              hide-details
              height="28px"
              class="search"
              :placeholder="header.text"
              v-model="filters[header.value]"
              :items="['Стажер', 'Сотрудник', 'Все']"
            ></v-select>
          </th>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { format } from "date-fns";
import UsersSkeleton from "./UsersSkeleton.vue";
export default {
  props: {
    isFiltering: Boolean,
  },
  components: {
    ClipLoader,
    UsersSkeleton,
  },
  data() {
    return {
      date: new Date().toLocaleDateString().split(".").reverse().join("-"),
      dateFormatted: "",
      menu: false,
      sortDirection: "",
      userStatus: "",
      timeOutQuery: null,

      filters: {
        id: "",
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        status: "Все",
        createdAt: "",
      },
      headers: [
        { text: "id", value: "id", align: "start" },
        { text: "Логин", value: "username", align: "start" },
        { text: "Имя", value: "firstName", align: "start" },
        {
          text: "Фамилия",
          value: "lastName",
          align: "start",
        },
        { text: "Email", value: "email", align: "start" },
        { text: "Телефон", value: "phone", align: "start" },
        { text: "Статус", value: "status", align: "start" },
        {
          text: "Зарегистрирован",
          value: "createdAt",
          align: "start",
        },
        {
          text: "Действия",
          value: "actions",
          align: "start",

          sortable: false,
        },
      ],
    };
  },
  computed: {
    paginationLength() {
      return Math.ceil(this.FILTERED / this.PERPAGE);
    },
    ...mapGetters({ USERS: ["clientUsers"] }),
    ...mapState({
      PERPAGE: (state) => state.admin.users.tableSettings.length,
      START: (state) => state.admin.users.tableSettings.start,
      FILTERED: (state) => state.admin.users.recordsFiltered,
      PAGE: (state) => state.admin.users.page,
    }),
  },
  updated() {
    this.$watchClickRow(".data-table-row", this.$router);
  },
  mounted() {
    this.$watchScroll(".v-data-table__wrapper");
    this.$watchClickRow(".data-table-row", this.$router);
  },
  filters: {
    dateFormat(date) {
      return format(new Date(date), "dd.MM.yyyy");
    },
    statusFormat(status) {
      return status === "employee" ? "Сотрудник" : "Стажер";
    },
  },
  methods: {
    save(date) {
      this.filters.createdAt = date;
      this.dateFormatted = format(new Date(date), "dd.MM.yyyy");
    },
    parseDate(date) {
      this.menu = false;
      if (!date) {
        this.filters.createdAt = "";
        return format(new Date(), "yyyy-MM-dd");
      }
      const [day, month, year] = date.split(".");
      if (month > 12 || month < 1 || day < 1 || day > 31) {
        return format(new Date(), "yyyy-MM-dd");
      }
      if (year > 1000 && day && month) {
        const seacrhDate = `${year}-${month}-${day}`;
        this.filters.createdAt = seacrhDate;
        return seacrhDate;
      } else {
        this.filters.createdAt = "";
      }
      return format(new Date(), "yyyy-MM-dd");
    },
    sortAsc(column) {
      const columnIndex =
        (column &&
          this.headers.findIndex((header) => header.value === column)) ||
        0;
      this.setOrderColumn(columnIndex);
    },
    sortDesc(dir) {
      this.sortDirection = dir === false ? "asc" : dir ? "desc" : "";
      this.setOrderDirection(this.sortDirection || "asc");
    },
    async activate(user, dialog) {
      try {
        user.isActivating = true;
        await this.activateUser(user.id);
        dialog.value = false;
        user.isActivating = false;
      } catch (error) {
        user.isActivating = false;
      }
    },
    async deActivate(user, dialog) {
      try {
        user.isActivating = true;
        await this.deActivateUser(user.id);
        dialog.value = false;
        user.isActivating = false;
      } catch (error) {
        user.isActivating = false;
      }
    },
    async userDelete(user) {
      try {
        user.isDeleting = true;
        await this.deleteUser(user.id);
        user.isDeleting = false;
      } catch (error) {
        user.isDeleting = false;
      }
    },
    async statusChange(dialog, user) {
      try {
        user.isChanging = true;
        const status = this.userStatus === "Стажер" ? "intern" : "employee";
        await this.changeStatus({ id: user.id, status });
        dialog.value = false;
        user.isChanging = false;
      } catch (error) {
        user.isChanging = false;
      }
    },
    updateItemsPerPage(perPage) {
      this.setPerPage(perPage);
      this.updatePage(1);
    },
    updatePage(page) {
      this.setPage(page);

      this.setStartPage((page - 1) * this.PERPAGE);
      this.$emit("updateUsers");
    },
    ...mapMutations([
      "setPerPage",
      "setPage",
      "setStartPage",
      "setOrderColumn",
      "setOrderDirection",
      "setColumnSearchValue",
    ]),
    ...mapActions([
      "activateUser",
      "deActivateUser",
      "deleteUser",
      "changeStatus",
    ]),
  },
  watch: {
    sortDirection() {
      this.$emit("updateUsers");
    },
    "filters.id"(id) {
      this.setPage(1);

      this.setColumnSearchValue({ searchValue: id, columnName: "" });
      this.$emit("updateUsers");
    },
    "filters.username"(username) {
      this.setPage(1);

      this.setColumnSearchValue({
        searchValue: username,
        columnName: "username",
      });
      this.$emit("updateUsers");
    },
    "filters.firstName"(firstName) {
      this.setPage(1);

      this.setColumnSearchValue({
        searchValue: firstName,
        columnName: "first_name",
      });
      this.$emit("updateUsers");
    },
    "filters.lastName"(lastName) {
      this.setPage(1);

      this.setColumnSearchValue({
        searchValue: lastName,
        columnName: "last_name",
      });
      this.$emit("updateUsers");
    },
    "filters.email"(email) {
      this.setPage(1);
      this.setColumnSearchValue({ searchValue: email, columnName: "email" });
      this.$emit("updateUsers");
    },
    "filters.phone"(phone) {
      this.setPage(1);
      this.setColumnSearchValue({ searchValue: phone, columnName: "phone" });
      this.$emit("updateUsers");
    },
    "filters.status"(status) {
      this.setPage(1);
      const searchValue =
        status === "Стажер"
          ? "intern"
          : status === "Сотрудник"
          ? "employee"
          : "";
      this.setColumnSearchValue({ searchValue, columnName: "status" });
      this.$emit("updateUsers");
    },
    "filters.createdAt"(createdAt) {
      this.setPage(1);
      this.setColumnSearchValue({
        searchValue: createdAt,
        columnName: "created_at",
      });
      this.$emit("updateUsers");
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/styles/_variables.scss";
.picker__menu {
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
.data-table-row {
  cursor: pointer !important;
}
.v-data-table__wrapper > table > thead > tr > th:last-child,
.v-data-table__wrapper > table > tbody > tr > td:last-child,
.v-data-table__wrapper > table > tr.custom-table-row > th:last-child {
  position: sticky !important;
  position: -webkit-sticky !important;
  right: -2px;
  z-index: 199;
  background: var(--main-bg);
  box-shadow: -1px 0 var(--box-shadow) !important;
  transition: box-shadow 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) !important;
}

.fullScroll > table > tbody > tr > td:last-child,
.fullScroll > table > tr.custom-table-row > th:last-child {
  box-shadow: none !important;
  background: none;
  z-index: unset;
  position: relative !important;
  right: 0;
  transition: box-shadow 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) !important;
}
.fullScroll > table > thead > tr > th:last-child {
  box-shadow: inset 0 -1px 0 rgb(0 0 0 / 12%) !important;
  transition: box-shadow 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) !important;
}
.v-data-table--fixed-header > .v-data-table__wrapper > table > thead > tr > th {
  background-color: var(--main-bg) !important;
  z-index: 200 !important;
}
.data-tatable table > thead > tr > th:last-child {
  z-index: 199;
}
.v-data-table__mobile-table-row
  > td:last-child
  > .v-data-table__mobile-row__header {
  display: none !important;
}
table {
  border-collapse: collapse !important;
  position: relative;
  td {
    border-color: var(--table-border) !important;
  }
  & .linear-progress {
    position: absolute !important;
    width: 100% !important;
    bottom: 1px;
  }
  .search div {
    min-height: unset !important;
    align-items: center !important;
    &.phoneInput {
      width: 100px !important;
    }
    .v-input__slot {
      width: 100px !important;
    }
    fieldset {
      background-color: var(--main-bg);
      border: 1px solid #c4c4c4 !important;
    }
  }
}
.search.v-select--is-menu-active {
  fieldset {
    border-color: $blue !important;
  }
}
.v-menu__content {
  z-index: 20002 !important;
}
.v-menu__content {
  background-color: var(--main-bg) !important;
  .v-select-list {
    background-color: var(--main-bg) !important;
    .v-list-item__title {
      color: var(--text-color) !important;
    }
  }
}
.custom-table-row {
  border-bottom: 1px solid #c4c4c4;
  @media (max-width: 796px) {
    display: none !important;
  }
  & th {
    padding: 10px !important;

    background-color: var(--main-bg) !important;
  }
  &:hover {
    background-color: transparent !important;
  }
}
.change-status {
  i {
    color: var(--text-color) !important;
  }
  fieldset {
    border-color: var(--text-color) !important;
  }
}
.filter-input {
  position: relative;
  z-index: 199;
  margin-top: 10px;
  margin-left: 10px;
  margin-bottom: 5px;

  &:last-child {
    input.search {
      display: none;
    }
  }
  &:first-child {
    input.search {
      max-width: 35px !important;
    }
  }
  input.search {
    padding: 12px 10px;
    border-radius: 5px;
    font-weight: 400 !important;
    height: 28px;
    outline: none;
    border: 1px solid #c4c4c4;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    &:focus {
      border-color: $blue;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
}
.phone {
  white-space: pre;
}
.activate__actions {
  display: flex;
  justify-content: space-between;
  max-height: 30px;
  margin-top: 30px;
}
.activate-dialog {
  min-height: 140px !important;
  height: unset !important;
  .v-card__title {
    display: block;
    text-align: center;
    word-break: normal;
    span {
      color: #0169d3;
    }
  }
}
.v-pagination__item {
  outline: transparent !important;
}
.v-pagination__item--active {
  background-color: var(--layout-bg) !important;
}
.v-data-table__wrapper {
  max-height: 83vh !important;
  overflow: auto !important;
  transition: 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  &:hover {
    transition: 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    scrollbar-color: $blue #cacaca;
    &::-webkit-scrollbar-thumb {
      transition: 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
      background-color: $blue !important;
      position: relative;
      z-index: -1;
      border-radius: 1px;
    }
  }
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    position: relative;
    z-index: -1;
  }
  &::-webkit-scrollbar-thumb {
    transition: 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);

    background-color: transparent;
    position: relative;
    z-index: -1;
    border-radius: 1px;
  }
  scrollbar-color: transparent transparent;
  scrollbar-width: thin;
}
.v-dialog {
  overflow: hidden;
  max-height: 190px !important;
  height: 100%;
  border-radius: 0 !important;
  .v-card {
    height: 100%;
    overflow: hidden;
    border-radius: 0 !important;
    border: 1px solid #c4c4c4 !important;
    padding-bottom: 23px !important;
    &__title {
      justify-content: center !important;
      font-weight: 600 !important;
      font-size: 14px !important;
      line-height: 19px !important;
    }
  }
  .custom-input {
    max-width: 261px !important;
    width: 100%;
    margin: 18px auto !important;
  }
}
.users-btn {
  background-color: $blue;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  padding: 5px 20px;
  border-radius: 5px;
  margin-right: 42px;
  width: 140px;
  height: 100%;
  max-height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  &.deny-btn {
    margin-right: 0;
  }
  &.custom-btn {
    padding: 5px 35px;
    max-width: 138px !important;
    width: 100%;
    margin: 18px auto;
  }
  &.disabled {
    &:hover {
      background-color: $blue !important;
    }
  }
  .v-spinner {
    display: flex;
    align-items: center;
  }
  span {
    color: #fff !important;
  }
  transition: 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  &:hover {
    transition: 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    border: 2px solid $blue;
    span {
      color: var(--text-color) !important;
    }
    background-color: var(--main-bg);
  }
}
.table {
  .status-btn {
    color: #0169d3;
    outline: none;
  }
  &__footer {
    border-top: 2px solid #c4c4c4;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    @media (max-width: 570px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  &__select {
    display: flex;
    align-items: center;
    align-self: flex-start;
    justify-content: center;
    @media (max-width: 570px) {
      align-self: center;
      margin-bottom: 10px;
    }
    span {
      display: inline-block;
      align-self: center;
      margin-top: 12px;
    }
    .v-select {
      margin-left: 15px;
      max-width: 45px !important;
    }
  }
  th {
    padding-left: 14px !important;
    text-align: left !important;
    white-space: pre;
  }
  td:nth-child(2),
  td:nth-child(3),
  td:nth-child(4),
  td:nth-child(5) {
    max-width: 120px !important;
    overflow: hidden;
    text-overflow: ellipsis;
    @media (max-width: 796px) {
      max-width: unset !important;
      overflow: unset;
    }
  }
  td:last-child {
    .v-data-table__mobile-row__cell {
      width: 100%;
    }
  }
  .actions {
    display: flex;
    align-items: center;
    @media (max-width: 796px) {
      justify-content: space-around;
    }
  }
  .v-data-footer {
    .v-data-footer__icons-before {
      button.v-btn.v-btn--disabled {
        i.v-icon {
          color: #888 !important;
        }
      }
      i.v-icon {
        color: var(--text-color) !important;
      }
    }
  }
  .v-data-footer__select {
    & .v-input {
      margin: 0 15px;
    }
  }
  border: 2px solid #e5e5e5;
  &__delete {
    outline: none;
    display: flex;
    align-items: center;
    margin-right: 15px;
    &--mobile {
      display: none;
      background-color: rgb(255, 57, 57);
      font-weight: 600;
      font-size: 14px;
      line-height: 19px;
      text-align: center;
      padding: 5px 30px;
      border-radius: 5px;
      max-height: 30px;
      @media (max-width: 796px) {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    @media (max-width: 796px) {
      display: none;
    }
  }
  &__edit-roles {
    outline: none !important;
    display: flex;
    align-items: center;
  }
}
</style>