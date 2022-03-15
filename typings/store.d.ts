import { RouterTy } from '~/router'
export interface AppTy {
  sidebar: {
    opened: boolean,
    withoutAnimation: boolean
  }
}
export interface SettingTy {
  tagsView: boolean,
  fixedHeader: boolean,
  sidebarLogo: boolean
}
export interface TagsViewTy {
  visitedViews: RouterTy,
  cachedViews: RouterTy,
}
export interface PermissionTy {
  routes: RouterTy
}
export interface UserTy {
  token: string | null
}
export interface StateTy {
  app: AppTy,
  setting: SettingTy,
  tagsViews: TagsViewTy,
  permission: PermissionTy,
  user: UserTy
}