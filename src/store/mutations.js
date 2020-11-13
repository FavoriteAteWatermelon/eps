import * as types from './mutation-types'
const mutations = {
  [types.SET_OPENED] (state, opened) {
    state.opened = opened
  },
  [types.SET_LOGIN] (state, isLogin) {
    state.isLogin = isLogin
  },
  [types.SET_INFO] (state, info) {
    state.userInfo = info
  }
}
export default mutations
