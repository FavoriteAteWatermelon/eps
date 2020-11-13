/* eslint-disable */
import { IMAGE_UPLOAD_API} from './config'
import { SERVER_HOST } from '@/config/host'
import http from '@/utils/request'
const config = {
  headers: {'Content-Type': 'multipart/form-data'}
}
export function uploadImage (data) {
  return new Promise((resolve, reject) => {
    // console.log(userInfo)
    http.post(SERVER_HOST + IMAGE_UPLOAD_API, data, config).then(res => {
      console.log(res)
      resolve(res)
    }).catch(err => {
      // for Debug
      reject(err)
      console.log(err)
    })
  })
}