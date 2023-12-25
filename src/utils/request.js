import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant'
// 根据环境不同引入不同api地址
import { baseApi } from '@/config'

const token = window.localStorage.getItem('token')
console.log(token)
// create an axios instance
const service = axios.create({
  baseURL: baseApi, // url = base api url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  headers: {
    // Authorization: 'Basic d2F0ZXI6d2F0ZXJfc2VjcmV0'
    Authorization: 'Basic c3dvcmQ6c3dvcmRfc2VjcmV0'
  }
})

// request拦截器 request interceptor
service.interceptors.request.use(
  config => {
    console.log(config)
    config.headers['Blade-Auth'] = 'bearer ' + window.localStorage.getItem('token')
    // 不传递默认开启loading
    if (!config.hideloading) {
      // loading
      Toast.loading({
        forbidClick: true
      })
    }
    if (store.getters.token) {
      config.headers['X-Token'] = ''
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    if (response['data']['error_code'] === 400) {
      Toast(response['data']['error_description'])
    }
    const res = response.data
    if (res.code && res.code !== 200) {
      // 登录超时,重新登录
      if (res.code === 401) {
        Toast('登录状态过期，请重新登录')
        setTimeout(res => {
          localStorage.clear()
          store.dispatch('noAuth')
          this.$router.push('/login')
        }, 1500)
      }
      return Promise.reject(res || 'error')
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    if (error.response['data']['code']) {
      Toast(error.response.data.msg)

      if (error.response['data']['code'] === 401) {
        store.dispatch('noAuth')
      }
    }
    return Promise.reject(error.response)
  }
)

export default service
