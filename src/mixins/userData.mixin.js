import InActiveUser from "@/components/InActiveUser";
import { mapState, mapMutations } from "vuex";
import errorsMixin from "./errors.mixin";
export default {
  components: {
    InActiveUser,
  },
  mixins: [errorsMixin],
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
