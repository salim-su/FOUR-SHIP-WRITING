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
    path: '/area-people-car-detail-guard',
    name: '/area-people-car-detail-guard',
    component: () => import('views/ship/area-people-car-detail-guard'),
    meta: { title: '作业写实', keepAlive: false, requireAuth: false }
  },
  {
    path: '/',
    redirect: '/loading',
    meta: { title: '', keepAlive: false, requireAuth: false }
  }
]
