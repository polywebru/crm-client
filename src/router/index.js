import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
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
    component: Profile,
    meta: {
      layout: "main",
    },
  },
  {
    path: "/admin",
    name: "Admin",
    meta: {
      layout: "admin",
    },
    redirect: {
      path: "/admin/users",
    },
    component: () => import("../views/Admin.vue"),
    children: [
      {
        path: "users",
        component: () => import("../views/AdminUsers.vue"),
        meta: {
          layout: "admin",
        },
      },
    ],
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
