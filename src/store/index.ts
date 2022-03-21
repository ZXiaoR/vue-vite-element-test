import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
// import getters from './getters'
import { StateTy } from '~/store'

// glob导入 https://cn.vitejs.dev/guide/features.html#glob-import
const modulesFiles = import.meta.globEager('./modules/*.ts')
const modules =  {}
for (const path in modulesFiles) {
  const moduleName = path.replace(/(.*\/)*([^.]+).*/gi, '$2')
  modules[moduleName] = modulesFiles[path].default
}
// 定义injection key
// https://vuex.vuejs.org/zh/guide/typescript-support.html
export const key: InjectionKey<Store<StateTy>> = Symbol()
export const store = createStore<StateTy>({
  modules
  // getters
})
// 定义自己的useStore组合式函数
export function useStore(): Store<StateTy> {
  return baseUseStore(key)
}