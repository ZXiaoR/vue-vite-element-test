import Cookies from 'js-cookie'
import { AppTy } from '~/store'
import { ObjTy } from '~/common'
const state: AppTy = {
    sidebar: {
        opened: Cookies.get('sidebarStatus') ? !!+ Cookies.get('sidebarStatus')! : true,
        withoutAnimation: false
    }
}
const mutations = {
    M_TOGGLE_SIDEBAR: (state: AppTy) => {
        state.sidebar.opened = !state.sidebar.opened
        state.sidebar.withoutAnimation = false
        if (state.sidebar.opened) {
            Cookies.set('sidebarStatus', '1')
        } else {
            Cookies.set('sidebarStatus', '0')
        }
    },
    M_CLOSE_SIDEBAR: (state: AppTy, { withoutAnimation }: {withoutAnimation: boolean}) => {
        Cookies.set('sidebarStatus', '0')
        state.sidebar.opened = false
        state.sidebar.withoutAnimation = withoutAnimation
    }
}
const actions = {
    toggleSideBar({ commit }:ObjTy) {
        commit('M_TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }: ObjTy, withoutAnimation: boolean) {
        commit('M_CLOSE_SIDEBAR', withoutAnimation)
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
