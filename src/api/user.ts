import request from '@/utils/request'
import { ObjTy } from '~/common'
export function doLogin(data: ObjTy) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}