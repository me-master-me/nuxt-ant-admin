const state = () => ({
  menuLayout: 'side', // side||top
  theme: '#0e4aa4', // 主题
  LOADDING: false, // 请求加载。。。
  ENCRYPTION: true, // 接口数据加密
  themeColorList: [
    {
      key: '薄暮',
      color: '#F5222D'
    },
    {
      key: '火山',
      color: '#FA541C'
    },
    {
      key: '日暮',
      color: '#FAAD14'
    },
    {
      key: '明青',
      color: '#13C2C2'
    },
    {
      key: '极光绿',
      color: '#52C41A'
    },
    {
      key: '拂晓蓝（默认）',
      color: '#1890FF'
    },
    {
      key: '极客蓝',
      color: '#2F54EB'
    },
    {
      key: '酱紫',
      color: '#722ED1'
    }
  ]
})

const mutations = {
  SET_THEME (state, color) {
    state.theme = color
  },
  SHOW_LOADDING (state) {
    state.LOADDING = true
  },
  REMOVE_LOADDING (state) {
    state.LOADDING = false
  }
}

const actions = {
  SET_THEME: ({ state, commit }, data) => {}
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
