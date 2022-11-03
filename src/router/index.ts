import { createRouter, createWebHistory, Router } from "vue-router"
import { RouterTy } from '~/router'
import Layout from '@/layout/index.vue'
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
        meta: { title: 'Dashboard', elSvgIcon: 'HomeFilled' }
      }
    ]
  },
  {
    path: '/ccc',
    component: Layout,
    meta: { title: 'Navigator One', elSvgIcon: 'Tools' },
    children: [
      {
        path: 'c1',
        name: 'ccc1',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: 'ccc1', icon: 'welcome' }
      }, {
        path: 'c2',
        name: 'ccc2',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: 'ccc2', elSvgIcon: 'Burger' }
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
        meta: { title: 'Navigator Two', elSvgIcon: 'HelpFilled' }
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