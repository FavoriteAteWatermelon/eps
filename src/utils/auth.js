/*
 * @Author: shundai
 * @Date: 2019-11-19 12:43:46
 * @Last Modified by: shundai
 * @Last Mo dified time: 2019-11-19 12:46:32
 */

import Cookies from 'js-cookie'
const TokenKey = 'userInfo'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}
