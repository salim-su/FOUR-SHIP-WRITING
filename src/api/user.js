import api from './index'
// axios
import request from '@/utils/request'

/* =================*/
export function deviceInfo(deviceId) {
  return request({
    url: api.DeviceInfo,
    method: 'get',
    params: {
      deviceId: deviceId
    },
    hideloading: true
  })
}
export function apInfo(deviceNo) {
  return request({
    url: api.ApInfo,
    method: 'get',
    params: {
      deviceNo: deviceNo
    },
    hideloading: true
  })
}
