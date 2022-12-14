import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/login/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/home/index.vue"),
      children: [
        {
          path: "member",
          name: "member",
          component: () => import("@/views/member/index.vue"),
        },
        {
          path: "category",
          name: "category",
          component: () => import("@/views/category/index.vue"),
        },
      ],
    },
  ],
});

export default router;
