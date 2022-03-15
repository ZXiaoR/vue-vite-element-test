import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import store from '@/store'
import { StateTy } from '~/store'
import { ElMessage } from 'element-plus'
import { ObjTy } from '~/common'
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  responseType: 'json',
  timeout: 5000,
  headers: {
    'Cache-Control': 'no-cache'
  }
})
// request拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = (store.state as StateTy).user.token
    if (token) {
      (config as ObjTy).headers['Token'] = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// response 拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data
    if (res.code !== 10000) {
      // 自定义逻辑即可
      ElMessage({
        type: 'error',
        message: '接口调用失败'
      })
      return Promise.reject(res)
    } else {
      return res
    }
  }
)
export default service