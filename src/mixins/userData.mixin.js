import InActiveUser from "@/components/InActiveUser";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    InActiveUser,
  },
  beforeRouteEnter(_, __, next) {
    next(async (vm) => {
      try {
        await vm.getUserInfo();
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
  computed: {
    ...mapState({
      IS_SHOW_LOAD_MENU: (state) => state.isShowLoadMenu,
      USER_INFO: (state) => state.profile.userInfo,
      IS_LOADING: (state) => state.profile.isLoading,
    }),
  },
  methods: {
    ...mapMutations(["setIsLoading"]),
  },
};
