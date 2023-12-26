/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/loading-ship-real-writing',
    component: () => import('views/loading/loading')
  },
  {
    path: '/apInfo',
    component: () => import('views/apInfo/apInfo')
  },
  {
    path: '/real-writing-ship-list',
    name: '/real-writing-ship-list',
    component: () => import('views/ship/real-writing-ship-list'),
    meta: { title: '作业写实', keepAlive: false, requireAuth: false }
  },
  {
    path: '/real-writing-submit',
    name: '/real-writing-submit',
    component: () => import('views/ship/real-writing-submit'),
    meta: { title: '作业写实提交', keepAlive: false, requireAuth: false }
  },
  {
    path: '/real-writing-record-list',
    name: '/real-writing-record-list',
    component: () => import('views/ship/real-writing-record-list'),
    meta: { title: '船名', keepAlive: false, requireAuth: false }
  },
  {
    path: '/',
    redirect: '/loading',
    meta: { title: '', keepAlive: false, requireAuth: false }
  }
]
