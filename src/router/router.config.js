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
    path: '/',
    redirect: '/loading',
    meta: { title: '', keepAlive: false, requireAuth: false }
  }
]
