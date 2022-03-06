import defaultSettings from '@/settings'
import { SettingTy } from '~/store'

const { tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state: SettingTy = {
  tagsView,
  fixedHeader,
  sidebarLogo
}

const mutations = {
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

