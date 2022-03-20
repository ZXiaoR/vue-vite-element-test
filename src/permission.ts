import router from '@/router'
import { store } from '@/store'
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress'
NProgress.configure({ showSpinner: false }) // NProgress Configuration
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/getPageTitle'
import {RouterRowTy} from '~/router'
const whiteList = ['/login', '/404', '/401'] // no redirect whitelist
router.beforeEach(async (to: any, from, next: any) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  const hasToken: string | null = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/dashboard' })
    } else {
      if (store.state.permission.routes.length > 0) {
        next()
      } else {
        try {
          store.dispatch('permission/dynamicRoutes') // 过滤菜单
          const accessRoutes = await store.dispatch('permission/generateRoutes')
          accessRoutes.forEach((route: RouterRowTy) => {
            router.addRoute(route)
          })
          next({ ...to, replace: true })
        } catch (error) {
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
