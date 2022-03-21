import { RouteRecordRaw } from "vue-router";
export interface RouteItemTy {
    /**
     * hidden 如果设置为true,将不会展示在sidebar
     */
    hidden?: boolean
    /**
     * alwaysShow
     * 如果设置为 true，将始终显示根菜单
     * 如果不设置 alwaysShow，当 item 有多个子路由时，
     * 会变成嵌套模式，否则不显示根菜单
    */
    alwaysShow?: boolean 
    /**
     * name
     * <keep-alive> 使用该名称（必须设置！！！）
     */
    name?: string
    /**
     * redirect
     * 如果设置 noRedirect 将不会在breadcrumb中重定向
     */
    redirect?: string
    meta?: {
        /**
         * title
         * sidebar和breadcrumb中显示的名称（推荐设置）
         */
        title: string
        /**
         * 自定义icon
         */
        icon?: string
        /**
         * activeMenu
         * 如果设置路径，sidebar将突出显示您设置的路径
         */
        activeMenu?: string
        /**
         * breadcrumb
         * 如果设置为 false，该项目将隐藏在breadcrumb中（默认为 true）
         */
        breadcrumb?: boolean
        /**
         * element-plus 中的icon
         * https://element-plus.gitee.io/zh-CN/component/icon.html
         */
        elSvgIcon?: string // 注意命名 首字母是大写
    },
    children?: RouterTy
}
export type RouterRowTy = RouteRecordRaw & RouteItemTy
export type RouterTy = Array<RouterRowTy>