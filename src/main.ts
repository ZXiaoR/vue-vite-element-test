import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import '@/styles/index.scss' // global css
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

import 'virtual:svg-icons-register'
import SvgIcon from '@/icons/SvgIcon.vue'
app.component('SvgIcon', SvgIcon)

app.use(ElementPlus)
app.use(router)
app.mount('#app')
