import { createI18n } from 'vue-i18n'
import Cookies from 'js-cookie'
const modulesFiles = import.meta.globEager('./modules/**/*.ts')
const messages =  {}
for (const path in modulesFiles) {
  const moduleName = path.replace(/(.*\/)*([^.]+).*/gi, '$2')
  messages[moduleName] = modulesFiles[path].default
}
console.log(messages)
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
  legacy: false,
  locale: getLanguage(),
  messages
})
export default i18n