import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import('../../test/index.vue')
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('../views/Login/index.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router