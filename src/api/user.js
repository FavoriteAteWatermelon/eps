/* eslint-disable */
import { USER_LOGIN_API, USER_ADD_API, USER_INFO_API, USER_DELETE_API} from './config'
import { SERVER_HOST } from '@/config/host'
import http from '@/utils/request'
// 新增用戶接口

export function userLogin (userInfo) {
  return new Promise((resolve, reject) => {
    console.log(userInfo)
    http.post(SERVER_HOST + USER_LOGIN_API, userInfo).then(res => {
      // console.log(res)
      resolve(res)
    }).catch(err => {
      // for Debug
      reject(err)
      console.log(err)
    })
  })
}


// 用户登录接口
export function userAdd (userInfo) {
  return new Promise((resolve, reject) => {
    console.log(userInfo)
    http.post(SERVER_HOST + USER_ADD_API, userInfo).then(res => {
      // console.log(res)
      resolve(res)
    }).catch(err => {
      // for Debug
      reject(err)
      console.log(err)
    })
  })
}
// 刪除用戶
export function userDelete (userInfo) {
  return new Promise((resolve, reject) => {
    // console.log(userInfo)
    http.post(SERVER_HOST + USER_DELETE_API, userInfo).then(res => {
      // console.log(res)
      resolve(res)
    }).catch(err => {
      // for Debug
      reject(err)
      console.log(err)
    })
  })
}
// 用户信息
export function userInfo () {
  return new Promise((resolve, reject) => {
    // console.log(userInfo)
    http.get(SERVER_HOST + USER_INFO_API).then(res => {
      // console.log(res)
      resolve(res)
    }).catch(err => {
      // for Debug
      reject(err)
      console.log(err)
    })
  })
}
