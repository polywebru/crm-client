import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import store from "../store";
import logout from "../store/logout";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {
      layout: "auth",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
    meta: {
      layout: "auth",
      page: "first",
    },
  },
  {
    path: "/user/:username",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: {
      layout: "main",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, _, next) => {
  if (
    to.name !== "Login" &&
    to.name !== "Register" &&
    !localStorage.getItem("auth")
  ) {
    next({ name: "Login" });
  } else if (
    (to.name === "Login" || to.name === "Register") &&
    localStorage.getItem("auth")
  ) {
    next({ path: `/user/${localStorage.getItem("username")}` });
  } else {
    next();
  }
});

export default router;
