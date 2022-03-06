// 路由管理
import { constantRoutes, endRoutes } from '@/router'
import { RouterTy } from  '~/router'
import { PermissionTy } from '~/store'
import { ObjTy } from '~/common'
let currentRoutes: RouterTy = [] // 当前过滤后的路由

const state: PermissionTy = {
  routes: []
}

const mutations = {
  SET_ROUTES: (state: PermissionTy, routes: RouterTy) => {
    state.routes = constantRoutes.concat(routes).concat(endRoutes)
  }
}

const actions = {
  // 根据modules制作路由，把不同角色对应的不同路由从引入的变成动态的
  dynamicRoutes() {
    currentRoutes = []
  },
  // 返回制作好的路由
  generateRoutes({ commit }: ObjTy) {
    return new Promise(resolve => {
      const accessedRoutes = currentRoutes
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}