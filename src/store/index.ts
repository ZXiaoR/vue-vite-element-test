import { createStore } from 'vuex'
import getters from './getters'
import { ObjTy } from '~/common'
import { StateTy } from '~/store'
// glob导入 https://cn.vitejs.dev/guide/features.html#glob-import
const modulesFiles = import.meta.globEager('./modules/*.ts')
const modules: ObjTy = {}
for (const path in modulesFiles) {
  const moduleName = path.replace(/(.*\/)*([^.]+).*/gi, '$2')
  modules[moduleName] = modulesFiles[path].default
}
export default createStore({
  modules,
  getters
})
