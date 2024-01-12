import * as echarts from 'echarts'
import _ from 'lodash'
import Vue from 'vue'
export const UTILS = {
  echarts,
  _,
  // 时间格式化
  formatTime (date, format) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    format = format.replace('YYYY', year)
    format = format.replace('MM', month)
    format = format.replace('DD', day)
    format = format.replace('HH', hours)
    format = format.replace('MM', minutes)
    format = format.replace('SS', seconds)
    return format
  },
  // 获取数据类型
  getPrototype (obj) {
    const type = typeof obj
    if (type !== 'object') {
      // 基础类型直接返回
      return type
    }
    // Object.prototype.toString
    return Object.prototype.toString
      .call(obj)
      .replace(/^\[object (\S+)\]$/, '$1')
  }
}
Vue.prototype.$uitls = UTILS
export const uitls = UTILS
