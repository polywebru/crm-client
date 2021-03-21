import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

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
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
