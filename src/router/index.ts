import { createRouter, createWebHistory, Router } from "vue-router";
import { RouterTy } from '~/router'
import Layout from '@/layout'
export const constantRoutes: RouterTy = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: 'Dashboard', icon: 'welcome' }
      }
    ]
  },
  {
    path: '/ccc',
    component: Layout,
    children: [
      {
        path: '',
        name: 'ccc',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: 'ccc', icon: 'welcome' }
      }
    ]
  },
  {
    path: '/ddd',
    component: Layout,
    children: [
      {
        path: '',
        name: 'ddd',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: 'ddd', icon: 'welcome' }
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('@/views/Login/index.vue'),
    hidden: true
  }
]
/* end - 其他不存在页面跳转到404，必须写在最后 */
export const endRoutes = [
  {
    // 404 page must be placed at the end !!!
    // using pathMatch install of "*" in vue-router 4.0
    path: '/:pathMatch(.*)',
    redirect: '/404',
    hidden: true
  }
]
const router: Router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes
})
export default router