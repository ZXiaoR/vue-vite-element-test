import { RouteRecordRaw } from "vue-router";
export interface RouteItemTy {
    hidden?: boolean
    alwaysShow?: boolean
    code?: number
    name?: string
    fullPath?: string
    path?: string
    meta?: {
        title: string
        icon?: string
        affix?: boolean
        activeMenu?: string
        breadcrumb?: boolean
        roles?: Array<string>
        elSvgIcon?: string
        code?: number
        cachePage?: boolean
        leaveRmCachePage?: boolean
        closeTabRmCache?: boolean
    }
    children?: RouterTy
    redirect?: string
}
export type RouterRowTy = RouteRecordRaw & RouteItemTy
export type RouterTy = Array<RouterRowTy>