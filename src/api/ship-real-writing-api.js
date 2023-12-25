import request from '@/utils/request'
const assignWork = 'api/assign-work/'
const api = {
  ShipVoyagePage: assignWork + 'voyageInfo/shipVoyagePage'
}
export function ShipVoyagePage(params) {
  return request({
    url: api.ShipVoyagePage,
    method: 'get',
    params,
    hideloading: true
  })
}
