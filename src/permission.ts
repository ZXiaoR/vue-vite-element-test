import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'
import { store }  from '@/store'
import getPageTitle from '@/utils/getPageTitle'
import {RouterRowTy} from '~/router'
import { RouteLocationNormalized } from 'vue-router'
NProgress.configure({ showSpinner: false }) // NProgress Configuration
const whiteList = ['/login', '/404', '/401'] // no redirect whitelist
router.beforeEach(async (to: RouteLocationNormalized, _: RouteLocationNormalized, next) => {
  NProgress.start()
  console.log(to)
  document.title = getPageTitle(to.meta.title)
  if (store.state.user.token) {
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
          console.log(error)
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
