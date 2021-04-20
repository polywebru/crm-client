<template>
  <main class="users">
    <div class="users__header">
      <h2 class="users__title">Пользователи</h2>
      <input
        type="search"
        class="global-search"
        placeholder="Поиск пользователей"
        v-model="searchUser"
      />
    </div>
    <users-skeleton v-show="isSkeletonLoader"></users-skeleton>
    <users
      v-show="!isSkeletonLoader"
      @updateUsers="updateUsers"
      :isFiltering="isLoadingUsers"
    ></users>
  </main>
</template>
<script>
import Users from "@/components/admin/Users.vue";
import UsersSkeleton from "@/components/admin/UsersSkeleton.vue";
import { mapMutations, mapState, createNamespacedHelpers } from "vuex";
import { debounce } from "lodash";
const { mapActions } = createNamespacedHelpers("users");
export default {
  metaInfo() {
    return { title: this.getTitle };
  },
  data() {
    return {
      isLoadingUsers: false,
      isSkeletonLoader: false,
      searchUser: "",
    };
  },

  components: { Users, UsersSkeleton },
  beforeRouteEnter(_, __, next) {
    next(async (vm) => {
      vm.setAdminLoading(true);
      try {
        await vm.getUsers();
        vm.setAdminLoading(false);
      } catch (e) {
        switch (e) {
          case 403:
            vm.setHasAccess(false);
            break;
          case 401:
            localStorage.clear();
            vm.$router.push("/");
            break;
          default:
            vm.$emit("showAlert");
            vm.setIsLoading(true);
            break;
        }
        vm.setAdminLoading(false);
      }
    });
  },
  destroyed() {
    this["users/resetTableSettings"]();
  },
  computed: {
    getTitle() {
      return (
        (this.HAS_ACCESS && "Пользователи - PolyWeb Admin") || "CRM - PolyWeb"
      );
    },
    ...mapState({ HAS_ACCESS: (state) => state.admin.hasAccess }),
  },
  methods: {
    updateUsers: debounce(async function () {
      try {
        this.isLoadingUsers = true;
        await this.getUsers();
        this.isLoadingUsers = false;
      } catch (error) {
        this.isLoadingUsers = false;
        throw e;
      }
    }, 400),
    ...mapActions(["getUsers"]),
    ...mapMutations([
      "setGlobalSearchValue",
      "setPage",
      "setHasAccess",
      "setAdminLoading",
      "users/resetTableSettings",
    ]),
  },
  watch: {
    async searchUser(searchValue) {
      this.setGlobalSearchValue(searchValue);
      this.setPage(1);
      await this.updateUsers();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
.users {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    .global-search {
      padding: 5px 30px;
      border: 1px solid #c4c4c4;
      outline: transparent !important;
      color: var(--text-color);
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      background: url("../assets/img/search.svg") no-repeat 95% center;
      &:focus {
        border-color: $blue;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      }
      @media (max-width: 400px) {
        width: 100%;
      }
    }
  }
  &__title {
    font-weight: 600;
    font-size: 16px;
    margin-right: 10px;
    line-height: 22px;
    color: var(--text-color);
    @media (max-width: 400px) {
      display: none;
    }
  }
}
</style>
