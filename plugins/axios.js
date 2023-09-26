// axios.js
import axios from 'axios'
import { addHttpLoading, removeHttpLoading } from './req-loading'
import Message from '@/plugins/reset-message.js'
// 加密处理引入封装好的方法
import { encryptStr, encryptObj, decryptObj } from '@/utils/encrypt'
import { getToken } from '@/utils/cookie'
import store from '@/store'

// 系统配置 是否 加密
const encryption =
  window.configObj.encryption || process.env.VUE_APP_ENCRYPTION

// 创建axios实例
const service = axios.create({
  baseURL: window.configObj.baseUrl || process.env.VUE_APP_BASE_URL,
  timeout: window.configObj.timeout || process.env.VUE_APP_TIME_OUT // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  (config) => {
    if (config.showLoading) {
      addHttpLoading()
    }
    const token = getToken()
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }

    // 不是formData格式数据 且 返回类型不是 blob 文件流  才进行加密
    const canEncryption = !(
      config.data instanceof FormData ||
      (config.responseType &&
        config.responseType.toLocaleLowerCase() === 'blob')
    )
    // 加密接口  系统配置可加密  且接口配置也加密 才进行加密
    if (encryption === '1' && config.encryption && canEncryption) {
      config.headers.encrypt = '1'
      if (config.data) {
        config.data = {
          encryptData: encryptObj(config.data)
        }
      }
      if (config.params) {
        for (const key in config.params) {
          if (
            config.params[key] !== '' &&
            config.params[key] !== null &&
            config.params[key] !== undefined
          ) {
            config.params[key] = encryptStr(config.params[key])
          }
        }
      }
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  async (response) => {
    if (response.config.showLoading) {
      removeHttpLoading()
    }
    const res = response.data

    // 如果系统配置可加密  且接口配置可加密  且返回数据类型不是文件流
    if (
      encryption === '1' &&
      response.config.encryption &&
      response.config.responseType !== 'blob'
    ) {
      res.data = decryptObj(res.data)
    }
    // 如果自定义代码不是200，则判断为错误。
    if (response.status !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      // code为200 或 返回的是文件流 直接返回
      if (res.code === 200 || response.config.responseType === 'blob') {
        return res
      }
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      if (res.code === 401) {
        await store.dispatch('user/logout')
        window.location.reload()
      }
      return Promise.reject(new Error(res.message || 'Error'))
    }
  },
  (error) => {
    console.log('🚀 ~ file: axios.js:96 ~ error', error)
    // error.message 为true 说明是被取消的请求,且接口有配置showLoading为true的, 请求异常才会减少请求接口
    if (error.message === true || (error.config && error.config.showLoading)) {
      removeHttpLoading()
    }
    if (error.name === 'AxiosError') {
      Message.error(error.message)
    }
    return Promise.reject(new Error(error))
  }
)

export default service
