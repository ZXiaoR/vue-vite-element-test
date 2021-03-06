import { getToken, setToken, removeToken } from '@/utils/auth'
import { UserTy, StateTy } from '~/store'
import { ObjTy } from '~/common'
import { doLogin } from '@/api/user'
import { Module } from 'vuex'
const state: UserTy = {
  token: getToken()
}
const mutations = {
  M_SET_TOKEN: (state: UserTy, token: string) => {
    state.token = token
  }
}
const actions= {
  // 登录逻辑
  login({ commit } : ObjTy, userInfo: ObjTy) {
    // 调用接口模拟
    doLogin(userInfo).then(res => {
      console.log(res)
    })
    return new Promise((resolve) => {
      const test_token = 'alPPZxSWQdzRWxkUx4'
      commit('M_SET_TOKEN', test_token)
      setToken(test_token)
      resolve('success')
    })
  },
  // 退出逻辑
  logout({ commit }: ObjTy) {
    return new Promise((resolve) => {
      commit('M_SET_TOKEN', '')
      removeToken()
      resolve('succss')
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
} as Module<UserTy,StateTy>