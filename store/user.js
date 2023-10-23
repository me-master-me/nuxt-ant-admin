// import Encry from '../plugins/encrytion.js'

const state = () => ({
  authUser: '',
  userInfo: {},
  menuList: [],
  permission: [],
  HeadNavigation: []
})

const mutations = {
  SET_TOKEN (state, data) {
    state.authUser = data
  },
  SET_INFO (state, data) {
    state.userInfo = data
  },
  SET_MENU (state, data) {
    state.menuList = data
  },
  SET_APPID (state, data) {
    state.appId = data
  },
  CLEAR_ALL (state) {
    state.authUser = ''
    state.userInfo = {}
    state.menuList = []
    state.tenantId = ''
    state.appId = ''
  },
  SET_PERMISSION (state, data) {
    const queue = []
    const permission = []
    if (data) {
      queue.push(data)
      while (queue.length) {
        const end = queue.shift()
        end.forEach((el) => {
          if (el.children.length > 0) {
            queue.push(el.children)
          } else {
            permission.push(el.path)
          }
        })
      }
    }
    sessionStorage.setItem('permission', permission)
    state.permission = permission
  }
}

const actions = {
  login ({ state, commit }, data) {
    const menuList = [
      {
        label: '概览',
        path: '/dashboard',
        icon: 'pie-chart',
        children: [
          {
            label: '工作台',
            path: '/dashboard/overview'
          },
          {
            label: '实时监控',
            path: '/12'
          }
        ]
      },
      {
        label: '数据分析',
        path: '/2',
        icon: 'appstore'
      },
      {
        label: '列表页',
        path: '/3',
        icon: 'unordered-list',
        children: [
          {
            label: '查询表格',
            path: '/31'
          },
          {
            label: '卡片列表',
            path: '/32'
          }
        ]
      },
      {
        label: '表单页',
        path: 'TaskCenter',
        icon: 'form',
        children: [
          {
            label: '新增表单',
            path: '/Task'
          }
        ]
      },
      {
        label: '详情页',
        path: '/4',
        icon: 'idcard',
        children: [
          {
            label: '基础详情页',
            path: '/41'
          },
          {
            label: '高级详情页',
            path: '/42'
          }
        ]
      },
      {
        label: '结果页',
        path: '/5',
        icon: 'check-circle',
        children: [
          {
            label: '成功',
            path: '/51'
          },
          {
            label: '失败',
            path: '/52'
          }
        ]
      }
    ]
    commit('SET_PERMISSION', menuList)
    commit('SET_MENU', menuList)
  },
  async logout ({ commit }, data) {
    const ret = await this.$http.post('/uias-service/oauth/logout')
    if (ret.code === 0) {
      sessionStorage.clear()
      this.$cookies.removeAll()
      commit('CLEAR_ALL')
      return {
        code: 0
      }
    }
  },

  async changePassword ({ commit }, data) {
    const ret = await this.$request.post('/editSelfPwd', data)
    return ret
  },

  uuid: ({ state, commit }, data) => {
    const s = []
    const hexDigits = '0123456789abcdef'
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4'
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
    s[8] = s[13] = s[18] = s[23] = '-'

    return s.join('')
  },

  resetToken ({ commit }, data) {
    commit('SET_TOKEN', data)
  },
  async error ({ commit }, data) {
    await this.$http.post('/404', data)
  }
}

export default {
  namespaced: true, // 有命名空间
  state,
  mutations,
  actions
}
