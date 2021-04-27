import { mapActions, mapGetters } from "vuex";
export default {
  async beforeRouteUpdate(to, from, next) {
    if (
      !from.path.includes("settings") &&
      !from.path.includes("login") &&
      !from.path.includes("register")
    ) {
      await this.userInfo(to, from);
    }
    next();
  },
  beforeRouteEnter(to, from, next) {
    next(async (vm) => {
      await vm.userInfo(to, from);
    });
  },
  computed: mapGetters({
    HAS_ROLES_AND_PERMISSIONS: ["hasRolesAndPermissions"],
  }),
  methods: {
    async userInfo(to, from) {
      try {
        if (
          from.name !== "Register" &&
          from.name !== "Login" &&
          to.name !== "Profile"
        ) {
          await this.getUserInfo({});
        } else {
          await this.getUserInfo({
            isFirstView: false,
            username: to.params.username,
          });
        }
        if (
          !this.HAS_ROLES_AND_PERMISSIONS &&
          from.name !== "Register" &&
          from.name !== "Login"
        ) {
          await this.getRolesAndPermissions();
        }
      } catch (e) {
        if (e === 401) {
          localStorage.clear();
          await this.$router.push({ name: "Login" });
        } else if (e >= 500) {
          this.$emit("showAlert");
          this.setIsLoading(true);
        }
      }
    },
    ...mapActions(["getRolesAndPermissions", "getUserInfo"]),
  },
};
