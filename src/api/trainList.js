/* eslint-disable */
import { TRAIN_LIST_ADD_API,TRAIN_LIST_INFO_API,TRAIN_LIST_DELETE_API} from './config'
import { SERVER_HOST } from '@/config/host'
import http from '@/utils/request'

export function addTrainList (data) {
  return new Promise((resolve, reject) => {
    // console.log(userInfo)
    http.post(SERVER_HOST + TRAIN_LIST_ADD_API, data).then(res => {
      console.log(res)
      resolve(res)
    }).catch(err => {
      // for Debug
      reject(err)
      console.log(err)
    })
  })
}

export function deleteTrainList (data) {
  return new Promise((resolve, reject) => {
    // console.log(userInfo)
    http.post(SERVER_HOST + TRAIN_LIST_DELETE_API, data).then(res => {
      console.log(res)
      resolve(res)
    }).catch(err => {
      // for Debug
      reject(err)
      console.log(err)
    })
  })
}


// 查詢issue數據
export function findTrainListInfo (pageSize , currentPage, dateArray) {
  // console.log(dateArray)
  return new Promise((resolve, reject) => {
    // console.log(userInfo)
    http.get(SERVER_HOST + TRAIN_LIST_INFO_API + '?limit=' + pageSize+'&skip=' + (currentPage -1) * pageSize + '&dateArray=' + dateArray).then(res => {
      // console.log(res)
      resolve(res)
    }).catch(err => {
      // for Debug
      reject(err)
      console.log(err)
    })
  })
}