import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import store from "../store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {
      layout: "auth",
    },
    beforeEnter: (_, __, next) => {
      if (localStorage.getItem("auth")) {
        next({ path: `/user/${localStorage.getItem("username")}` });
      } else {
        next();
      }
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
    beforeEnter: (_, __, next) => {
      if (store.state.formPending) {
        next({ path: "/" });
      } else if (localStorage.getItem("auth")) {
        next({ path: `/user/${localStorage.getItem("username")}` });
      } else {
        next();
      }
    },
  },
  {
    path: "/user/:username",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: {
      layout: "main",
    },
    beforeEnter: (to, _, next) => {
      if (to.params.username === localStorage.getItem("username")) {
        next();
      } else {
        next({ name: "Login" });
      }
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
