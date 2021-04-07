import { mapActions, mapGetters } from "vuex";
export default {
  beforeRouteEnter(_, __, next) {
    next(async (vm) => {
      try {
        await vm.getUserInfo();
        await vm.getRolesAndPermissions();
      } catch (e) {
        if (e === 401) {
          localStorage.clear();
          vm.$router.push("/");
        } else if (e >= 500) {
          vm.$emit("showAlert");
          vm.setIsLoading(true);
        }
      }
    });
  },
  computed: mapGetters({
    HAS_ROLES_AND_PERMISSIONS: ["hasRolesAndPermissions"],
  }),
  methods: mapActions(["getRolesAndPermissions", "getUserInfo"]),
};
