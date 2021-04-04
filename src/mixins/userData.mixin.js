import InActiveUser from "@/components/InActiveUser";
import { mapState } from "vuex";
export default {
  components: {
    InActiveUser,
  },
  beforeRouteEnter(_, __, next) {
    next(async (vm) => {
      try {
        await vm.getUserInfo();
      } catch (e) {
        vm.$emit("showAlert");
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
};
