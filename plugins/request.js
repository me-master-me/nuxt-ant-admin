import originalAxios from 'axios'
import Vue from 'vue'
import service from './axios'

const GLOBAL_REQUEST_OBJ = {}
function newRequest (name, params) {
  return new Promise((resolve, reject) => {
    if (GLOBAL_REQUEST_OBJ[name]) {
      GLOBAL_REQUEST_OBJ[name].cancel(params.showLoading)
    }
    const CancelToken = originalAxios.CancelToken
    GLOBAL_REQUEST_OBJ[name] = CancelToken.source()
    Object.assign(params, { cancelToken: GLOBAL_REQUEST_OBJ[name].token })

    service(params)
      .then((result) => {
        delete GLOBAL_REQUEST_OBJ[name]
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

['get', 'post', 'delete', 'put', 'patch'].forEach((type) => {
  newRequest[type] = (name, ...params) => {
    let isShowLoading = false // 此变量为vue项目axios请求优化（一）中告知是否要loading数量减少的作用
    if (params[1].params && (type === 'get' || type === 'delete') && !params[2]) {
      isShowLoading = params[1].showLoading || false
    } else {
      isShowLoading = params[2].showLoading || false
    }
    return new Promise((resolve, reject) => {
      if (GLOBAL_REQUEST_OBJ[name]) {
        // 告知是否需要将请求数量减少
        GLOBAL_REQUEST_OBJ[name].cancel(isShowLoading)
      }

      const CancelToken = originalAxios.CancelToken
      GLOBAL_REQUEST_OBJ[name] = CancelToken.source()
      // 第二个参数对象 存在 params且是 get 请求 或者 delete 请求， 无第三个参数 config
      if (params[1].params && (type === 'get' || type === 'delete') && !params[2]) {
        params[1].cancelToken = GLOBAL_REQUEST_OBJ[name].token
      } else { // 配置config
        Object.assign(params[2], { cancelToken: GLOBAL_REQUEST_OBJ[name].token })
      }
      service[type]
        .apply(this, params)
        .then((result) => {
          delete GLOBAL_REQUEST_OBJ[name]
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
})

export const request = newRequest
Vue.prototype.$request = newRequest
