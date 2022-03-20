import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
import router from './router'
import '@/styles/index.scss'

import {store, key} from '@/store'
app.use(store, key)

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)

import 'virtual:svg-icons-register'
import SvgIcon from '@/icons/SvgIcon.vue'
app.component('SvgIcon', SvgIcon)

import './permission'

app.use(router).mount('#app')
