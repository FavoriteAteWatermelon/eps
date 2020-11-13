/* eslint-disable */
import { TRAINING_ADD_API,TRAINING_DELETE_API,TRAINING_INFO_API,TRAINING_INFO_ALL_API,TRAINING_UPDATE_API} from './config'
import { SERVER_HOST } from '@/config/host'
import http from '@/utils/request'

export function addTraining (data) {
  return new Promise((resolve, reject) => {
    // console.log(userInfo)
    http.post(SERVER_HOST + TRAINING_ADD_API, data).then(res => {
      console.log(res)
      resolve(res)
    }).catch(err => {
      // for Debug
      reject(err)
      console.log(err)
    })
  })
}

export function deleteTraining (data) {
  return new Promise((resolve, reject) => {
    // console.log(userInfo)
    http.post(SERVER_HOST + TRAINING_DELETE_API, data).then(res => {
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
export function findTraingInfo (pageSize , currentPage, dateArray) {
  // console.log(dateArray)
  return new Promise((resolve, reject) => {
    // console.log(userInfo)
    http.get(SERVER_HOST + TRAINING_INFO_API + '?limit=' + pageSize+'&skip=' + (currentPage -1) * pageSize + '&dateArray=' + dateArray).then(res => {
      // console.log(res)
      resolve(res)
    }).catch(err => {
      // for Debug
      reject(err)
      console.log(err)
    })
  })
}


// 查詢issue數據
export function findTraingInfoAll ( dateArray) {
  // console.log(dateArray)
  return new Promise((resolve, reject) => {
    // console.log(userInfo)
    http.get(SERVER_HOST + TRAINING_INFO_ALL_API + '?dateArray=' + dateArray).then(res => {
      // console.log(res)
      resolve(res)
    }).catch(err => {
      // for Debug
      reject(err)
      console.log(err)
    })
  })
}

// 更新Training
export function updateTraining (_id, updateData ) {
  // console.log(dateArray)
  return new Promise((resolve, reject) => {
    // console.log(userInfo)
    http.post(SERVER_HOST + TRAINING_UPDATE_API, {_id, updateData}).then(res => {
      // console.log(res)
      resolve(res)
    }).catch(err => {
      // for Debug
      reject(err)
      console.log(err)
    })
  })
}