import request from '@/utils/request'

const assignWork = 'api/assign-work/'
const api = {
  ShipVoyagePage: assignWork + 'voyageInfo/shipVoyagePage',
  ShipRealWritingList: assignWork + 'shipRealWriting/list',
  ShipRealWriting: assignWork + 'shipRealWriting/submit',
  Dictionary: 'api/blade-system/dict-biz/dictionary'
}
export function Dictionary(code) {
  return request({
    url: api.Dictionary,
    method: 'get',
    params: {
      code: code
    },
    hideloading: true
  })
}
export function ShipRealWritingList(params) {
  return request({
    url: api.ShipRealWritingList,
    method: 'get',
    params,
    hideloading: true
  })
}
export function ShipVoyagePage(params) {
  return request({
    url: api.ShipVoyagePage,
    method: 'get',
    params,
    hideloading: true
  })
}

export function ShipRealWriting(data) {
  return request({
    url: api.ShipRealWriting,
    method: 'post',
    data,
    hideloading: true
  })
}
