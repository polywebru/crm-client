import InActiveUser from "@/components/InActiveUser";
import { mapState, mapMutations } from "vuex";
import routerHooks from "./routerHooks.mixin";
export default {
  components: {
    InActiveUser,
  },
  mixins: [routerHooks],
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
