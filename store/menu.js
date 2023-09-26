const state = () => ({
  menuList: [
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
  ],
  permission: []
})

const mutations = {
  SET_MENU (state, data) {
    state.menuList = data
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

const actions = {}

export default {
  namespaced: true, // 有命名空间
  state,
  mutations,
  actions
}
