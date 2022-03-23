import { createI18n } from "vue-i18n"
import Cookies from 'js-cookie'
import elementEnLocale from 'element-plus/lib/locale/lang/en'
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn'
const modulesFiles = import.meta.globEager('./modules/**/*.ts')
const messages =  {
  en: {
    ...elementEnLocale
  },
  zh: {
    ...elementZhLocale
  }
}
for (const path in modulesFiles) {
  const moduleName = path.replace(/(.*\/)*([^.]+).*/gi, '$2') // en / zh
  messages[moduleName] = {
    ...messages[moduleName],
    ...modulesFiles[path].default
  }
}
export function getLanguage(): string {
  const chooseLanguage = Cookies.get('language')
  if (chooseLanguage) return chooseLanguage

  // if has not choose language
  const language = (navigator.language || window.navigator['browserLanguage']).toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'zh'
}
const i18n = createI18n({
  locale: getLanguage(),
  messages
})
export default i18n