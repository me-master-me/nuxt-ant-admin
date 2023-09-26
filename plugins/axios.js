import axios from 'axios'
import { message } from 'ant-design-vue'
import _ from 'lodash'
import Encry from './encrytion.js'

/**
 * 异常错误码
 */
const codeMessage = {
  20000: '服务器成功返回请求的数据。',
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '请求的接口不存在。',
  405: '请求方法不允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}
// 创建axios实例
const service = axios.create({
  baseURL: '/api',
  timeout: 60000 // 请求超时时间
})
let needLoadingRequestCount = 0
// 取消重复请求
const pending = []
const CancelToken = axios.CancelToken
// 移除重复请求
const removePending = (config) => {
  for (const key in pending) {
    const item = +key // 转number类型
    const list = pending[key]
    // 当前请求在数组中存在时执行函数体
    /**
     * 过滤需要重复调用的接口
     */
    const filterList = []
    if (
      !filterList.includes(config.url) &&
      list.url === config.url &&
      list.method === config.method &&
      JSON.stringify(list.params) === JSON.stringify(config.params) &&
      JSON.stringify(list.data) === JSON.stringify(config.data)
    ) {
      // 执行取消操作
      list.cancel('操作太频繁，请稍后再试')
      // 从数组中移除记录
      pending.splice(item, 1)
    }
  }
}
export default ({ store, redirect, error, req, $http }, inject) => {
  // 显示loading
  function showLoading () {
    if (needLoadingRequestCount === 0) {
      store.commit('basicSet/SHOW_LOADDING')
    }
    needLoadingRequestCount++
  }

  // 隐藏loading
  function hideLoading () {
    needLoadingRequestCount--
    needLoadingRequestCount = Math.max(needLoadingRequestCount, 0)
    if (needLoadingRequestCount === 0) {
      // 关闭loading
      toHideLoading()
    }
  }

  // 防抖：将 300ms 间隔内的关闭 loading 便合并为一次。防止连续请求时， loading闪烁的问题。
  const toHideLoading = _.debounce(() => {
    store.commit('basicSet/REMOVE_LOADDING')
  }, 300)
  // 系统配置 是否 加密
  const encryption = store.state.basicSet.ENCRYPTION || false

  // request拦截器
  service.interceptors.request.use(
    (config) => {
      removePending(config)
      config.cancelToken = new CancelToken((c) => {
        pending.push({
          url: config.url,
          method: config.method,
          params: config.params,
          data: config.data,
          cancel: c
        })
      })
      if (process.client) {
        // 浏览器执行的客户端代码
        if (config.headers.showLoading !== false) {
          showLoading()
        }
      }

      const token = store.state.user.authUser // vuex中取到token
      if (token) {
        config.headers.Authorization = 'Bearer ' + token
      }

      // 不是formData格式数据 且 返回类型不是 blob 文件流  才进行加密
      const canEncryption = !(
        config.data instanceof FormData ||
        (config.responseType &&
          config.responseType.toLocaleLowerCase() === 'blob')
      )
      console.log(config)
      // 加密接口  系统配置可加密  且接口配置也加密 才进行加密
      if (encryption && config.headers?.encryption && canEncryption) {
        if (config.data) {
          for (const key in config.data) {
            if (
              config.data[key] !== '' &&
              config.data[key] !== null &&
              config.data[key] !== undefined
            ) {
              config.data[key] = Encry.encrypt(config.data[key])
            }
          }
        }
      }
      return config
    },
    (err) => {
      if (err.config.headers.showLoading !== false) {
        hideLoading()
      }
      if (process.client) {
        message.error(message)
      }
      return Promise.reject(err)
    }
  )

  // respone拦截器
  service.interceptors.response.use(
    async (response) => {
      removePending(response.config)
      if (response.config.headers?.showLoading) {
        hideLoading()
      }
      const res = response.data

      // 如果系统配置可加密  且接口配置可加密  且返回数据类型不是文件流
      if (
        encryption === '1' &&
        response.config.encryption &&
        response.config.responseType !== 'blob'
      ) {
        res.data = Encry.decrypt(res.data)
      }
      // 如果自定义代码不是200，则判断为错误。
      if (response.status !== 200) {
        message.error(codeMessage[response.status] || '网关超时')
        return Promise.reject(new Error(res.message || 'Error'))
      } else {
        // code为200 或 返回的是文件流 直接返回
        if (res.code === 200 || response.config.responseType === 'blob') {
          return res
        }
        if (res.code === 401) {
          await store.dispatch('user/logout')
          window.location.reload()
        }
        return Promise.reject(new Error(res.message || 'Error'))
      }
    },
    (error) => {
      console.log('🚀 ~ file: axios.js:152 ~ error', error)
      // error.message 为true 说明是被取消的请求,且接口有配置showLoading为true的, 请求异常才会减少请求接口
      if (error.config?.headers?.showLoading !== false) {
        hideLoading()
      }
      if (process.client) {
        hideLoading()
      }
      return Promise.reject(error)
    }
  )
  service.all = axios.all
  service.spread = axios.spread
  inject('request', service)
}
