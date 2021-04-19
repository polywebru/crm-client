import { mapActions, mapGetters } from "vuex";
export default {
  beforeRouteUpdate(to, from, next) {
    this.userInfo(to, from);
    next();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.userInfo(to, from);
    });
  },
  computed: mapGetters({
    HAS_ROLES_AND_PERMISSIONS: ["hasRolesAndPermissions"],
  }),
  methods: {
    async userInfo(to, from) {
      try {
        if (
          from.name === "Register" ||
          from.name === "Login" ||
          to.name !== "Profile"
        ) {
          await this.getUserInfo();
        } else {
          await this.getUserInfo({
            isFirstView: false,
            username: to.params.username,
          });
        }
        if (!HAS_ROLES_AND_PERMISSIONS) {
          await this.getRolesAndPermissions();
        }
      } catch (e) {
        if (e === 401) {
          localStorage.clear();
          this.$router.push("/");
        } else if (e >= 500) {
          this.$emit("showAlert");
          this.setIsLoading(true);
        }
      }
    },
    ...mapActions(["getRolesAndPermissions", "getUserInfo"]),
  },
};
