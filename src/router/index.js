import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Layout from '@/views/layout'
// import chartsRouter from './modules/charts'
Vue.use(Router)
/* eslint-disable */
export const routes = [

  // 跟跳转
  {
    path: '/',
    redirect: '/fae',
    name: 'home',
    hidden: true
  },
  // 首页
  {
    path: '/fae',
    // component: Layout,
    component: Layout,
    name: 'FAE',
    redirect: '/fae/training',
    icon: 'el-icon-service',
    children: [
      {
        path: '/fae/training',
        component: () => import('@/views/fae/training'),
        name: '培訓詳情',
        meta: { title: '培訓詳情', icon: 'el-icon-cold-drink',nav : 'last' },
      },
      {
        path: '/fae/trainingList',
        component: () => import('@/views/fae/trainingList'),
        name: '培訓項目',
        meta: { title: '培訓項目', icon: 'el-icon-cold-drink',nav : 'last' },
      },
      {
        path: '/fae/manager',
        component: () => import('@/views/fae/manager'),
        name: '公眾號後台',
        meta: { title: 'MINI', icon: 'el-icon-cold-drink',nav : 'last' },
      },
      {
        path: '/fae/wechat',
        component: () => import('@/views/fae/wechat'),
        name: '配備管理',
        meta: { title: 'FAE', icon: 'coinel-icon-service'},
        children: [
          {
            path: '/fae/manager/cpu',
            component: () => import('@/views/fae/management/cpu'),
            name: 'CPU',
            meta: { title: 'CPU', nav: 'last' }
          }, 
          {
            path: '/fae/manager/mem',
            component: () => import('@/views/fae/management/mem'),
            name: 'MEM',
            meta: { title: 'MEM', nav: 'last' }
          }, 
          {
            path: '/fae/manager/hdd',
            component: () => import('@/views/fae/management/hdd'),
            name: 'HDD',
            meta: { title: 'HDD', nav: 'last' }
          }, 
          {
            path: '/fae/manager/other',
            component: () => import('@/views/fae/management/other'),
            name: 'Other',
            meta: { title: 'Other', nav: 'last' }
          }, 
        ]
      }
    ]
  },
  {
    path: '/hw',
    component: Layout,
    icon: 'el-icon-cpu',
    redirect: '/hw/index',
    name: 'HW',
    children: [
      {
        path: '/hw/index',
        component: () => import('@/views/hw/index'),
        name: 'HW',
        meta: {nav: 'last'},
        icon: 'el-icon-cpu'
      }

    ]
  },
  {
    path: '/bios',
    component: Layout,
    icon: 'el-icon-key',
    redirect: '/bios/index',
    name: 'BIOS',
    children: [
      {
        path: '/bios/index',
        component: () => import('@/views/bios/index'),
        name: 'BIOS',
        meta: {nav: 'last'},
        icon: 'el-icon-key'
      }

    ]
  },
  {
    path: '/fa',
    component: Layout,
    icon: 'el-icon-aim',
    redirect: '/fa/index',
    name: 'FA',
    children: [
      {
        path: '/fa/index',
        component: () => import('@/views/fa/index'),
        name: 'FA',
        meta: {nav: 'last'},
        icon: 'el-icon-aim'
      }

    ]
  },
  {
    path: '/sit',
    component: Layout,
    icon: 'el-icon-data-analysis',
    redirect: '/sit/index',
    name: 'SIT',
    children: [
      {
        path: '/sit/index',
        component: () => import('@/views/sit/index'),
        name: 'SIT',
        meta: {nav: 'last'},
        icon: 'el-icon-data-analysis'
      }

    ]
  },
  {
    path: '/pm',
    component: Layout,
    icon: 'el-icon-medal-1',
    redirect: '/pm/index',
    name: 'PM',
    children: [
      {
        path: '/pm/index',
        component: () => import('@/views/pm/index'),
        name: 'PM',
        meta: {nav: 'last'},
        icon: 'el-icon-medal-1'
      }

    ]
  },
  {
    path: '/user',
    component: Layout,
    icon: 'el-icon-s-custom',
    redirect: '/user/info',
    name: 'User',
    children: [
      {
        path: '/user/info',
        component: () => import('@/views/user/index'),
        name: '用戶列表',
        meta: {nav: 'last'},
        icon: 'el-icon-s-custom'
      }

    ]
  }
  // chartsRouter
]
const createRouter = () => new Router({
  // mode: 'history',
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes
})
const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
