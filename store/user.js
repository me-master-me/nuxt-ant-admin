// import Encry from '../plugins/encrytion.js'

const state = () => ({
  authUser: '',
  userInfo: {},
  menuList: [],
  permission: [],
  appId: ''
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
            permission.push(el.uri)
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
    const loginParam = {
      appCode: 'ai-tvm',
      loginType: 'user',
      tenantKey: 'a1e3729344584f628cfc5d4f53d30ddb',
      client_id: 'browser',
      client_secret: 'browser'
    }
    const mergeData = Object.assign(data, loginParam)
    this.$request.post('/uias-service/oauth/token1', mergeData, {
      headers: { encryption: true }
    })
    this.$request.post('/uias-service/oauth/token12', mergeData, {
      headers: { encryption: true }
    })
    this.$request.post('/uias-service/oauth/token13', mergeData)
    this.$request.post('/uias-service/oauth/token14', mergeData)
    this.$request.post('/uias-service/oauth/token15', mergeData)
    this.$request.post('/uias-service/oauth/token16', mergeData)
    this.$request.post('/uias-service/oauth/token17', mergeData)
    this.$request.post('/uias-service/oauth/token18', mergeData)
    this.$request.post('/uias-service/oauth/token19', mergeData)
    this.$request.post('/uias-service/oauth/token1', mergeData)
    this.$request.post('/uias-service/oauth/token1', mergeData)
    this.$request.post('/uias-service/oauth/token1', mergeData)
    this.$request.post('/uias-service/oauth/token1', mergeData)
    this.$request.post('/uias-service/oauth/token1', mergeData)
    this.$request.post('/uias-service/oauth/token1', mergeData)
    this.$request.post('/uias-service/oauth/token1', mergeData)
    this.$request.post('/uias-service/oauth/token1', mergeData)
    this.$request.post('/uias-service/oauth/token1', mergeData)
    this.$request.post('/uias-service/oauth/token1', mergeData)

    // if (ret.code === 0) {
    //   const { token, userInfo, resourceTree } = ret.data

    //   commit('SET_PERMISSION', resourceTree?.children)

    //   this.$cookies.set('token', Encry.encrypt(JSON.stringify(token), 'token'))

    //   sessionStorage.setItem(
    //     'userInfo',
    //     Encry.encrypt(JSON.stringify(userInfo), 'userInfo')
    //   )
    //   sessionStorage.setItem(
    //     'menuList',
    //     JSON.stringify(resourceTree?.children)
    //   )

    //   sessionStorage.setItem('appId', resourceTree?.appId)

    //   commit('SET_TOKEN', token)
    //   commit('SET_INFO', userInfo)
    //   commit('SET_MENU', resourceTree?.children)
    //   commit('SET_APPID', resourceTree?.appId)
    // }
    // return ret
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
