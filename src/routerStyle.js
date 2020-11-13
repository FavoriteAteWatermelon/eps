import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// NProgress.configure({ showSpinner: false })
// not permission
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})
