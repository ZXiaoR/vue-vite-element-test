import defaultSettings from '@/settings'
import { Module } from 'vuex'
import { SettingTy, StateTy } from '~/store'

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
} as Module<SettingTy,StateTy>

