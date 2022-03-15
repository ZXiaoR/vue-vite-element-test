import { getToken, setToken, removeToken } from '@/utils/auth'
import { UserTy } from '~/store'
import { ObjTy } from '~/common'
import { doLogin } from '@/api/user'
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
    return new Promise((resolve, reject) => {
      const test_token: string = ' alPPZxSWQdzRWxkUx4'
      commit('SET_TOKEN', test_token)
      setToken(test_token)
      resolve('success')
    })
  },
  // 退出逻辑
  logout({ commit, state }: ObjTy) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
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
}