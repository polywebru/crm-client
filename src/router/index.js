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
    path: "/users/:username",
    name: "Profile",
    component: Profile,
    meta: {
      layout: "main",
    },
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("@/views/ProfileSettings.vue"),
    meta: {
      layout: "main",
    },
    redirect: "/settings/main-info",
    children: [
      {
        path: "main-info",
        component: () => import("@/components/profileSettings/Main.vue"),
        meta: {
          layout: "main",
        },
      },
      {
        path: "contact-info",
        component: () => import("@/components/profileSettings/Contacts.vue"),
        meta: {
          layout: "main",
        },
      },
      {
        path: "additional-info",
        component: () => import("@/components/profileSettings/Additional.vue"),
        meta: {
          layout: "main",
        },
      },
      {
        path: "password",
        component: () => import("@/components/profileSettings/Password.vue"),
        meta: {
          layout: "main",
        },
      },
      {
        path: "links",
        component: () => import("@/components/profileSettings/Links.vue"),
        meta: {
          layout: "main",
        },
      },
      {
        path: "skills",
        component: () => import("@/components/profileSettings/Skills.vue"),
        meta: {
          layout: "main",
        },
      },
    ],
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
    next({ path: `/users/${localStorage.getItem("username")}` });
  } else {
    next();
  }
});

export default router;
