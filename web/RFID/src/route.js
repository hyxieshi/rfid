import { createRouter, createWebHashHistory } from "vue-router";
import { useAlertsStore } from "@/store.js";

const routes = [
  {
    path: "/",
    component: () => import("./views/Login.vue"),
  },
  {
    path: "/Index",
    component: () => import("./views/Index.vue"),
  },
  {
    path: "/details/:id",
    component: () => import("./views/Details.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

/**
 * 如果 路径为 /  直接放行
 * 如果为其他路径 检查store userInfo 是否有值
 * 无值 跳转 /
 */
router.beforeEach((to, from, next) => {
  const store = useAlertsStore();

  if (to.fullPath == "/") {
    next();
  } else {
    if (store.userInfo) {
      next();
    } else {
      next("/");
    }
  }
});

export default router;
