// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
// import 'babel-polyfill'
import router from './router'
import ElementUI from 'element-ui'
import VueCropper from 'vue-cropper'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/scss/index.scss'
import store from '@/store'
import './routerStyle'
// import axios from 'axios'
// Vue.prototype.$ajax = axios
// import VueSocketIO from 'vue-socket.io'
// Vue.use(new VueSocketIO({

//   debug: true,

//   connection: 'http://192.17.1.80:3000/'
//   // connection: 'localhost:3000'

// }))
Vue.config.productionTip = false
Vue.use(VueCropper)
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
