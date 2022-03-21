import { RouterTy } from '~/router'
export interface AppTy {
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  }
}
export interface SettingTy {
  tagsView: boolean;
  fixedHeader: boolean;
  sidebarLogo: boolean;
}
export interface PermissionTy {
  routes: RouterTy;
}
export interface UserTy {
  token: string | null;
}
export interface StateTy {
  app: AppTy;
  setting: SettingTy;
  permission: PermissionTy;
  user: UserTy;
}