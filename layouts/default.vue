<template>
  <div>
    <a-layout v-if="!layoutPage.includes($route.path)" id="page-layout">
      <a-layout-header class="header" :style="{ background: '#fff' }">
        <div class="header_left">
          <NuxtLogo class="logo" />
          <div class="title">
            Nuxt-Ant-Admin
          </div>
          <NuxtMenu
            v-if="!sideMenu"
            style="margin-left: 50px"
            mode="horizontal"
          />
        </div>
        <div>
          <a-dropdown>
            <a-avatar icon="user" /> <a-icon type="down" />
            <a-menu slot="overlay" @click="handleMenuClick">
              <a-menu-item key="0">
                切换
              </a-menu-item>
              <a-menu-item key="1">
                退出登录
              </a-menu-item>
              <a-menu-divider />
            </a-menu>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout style="background: #fff" class="min-container">
        <a-layout-sider
          v-if="sideMenu"
          v-model="collapsed"
          :trigger="null"
          collapsible
          width="240"
          style="background: #fff; overflow: auto"
        >
          <NuxtMenu mode="inline" :collapsed="collapsed" />
        </a-layout-sider>
        <a-layout class="page-content">
          <a-layout-header class="header_left" :style="{ width: '100%' }">
            <a-icon
              v-if="sideMenu"
              class="trigger"
              :type="collapsed ? 'menu-unfold' : 'menu-fold'"
              @click="collapsed = !collapsed"
            />
            <!-- <BreadCrumb /> -->
            <HeadNavigation />
          </a-layout-header>
          <a-layout-content :style="{ padding: '0 20px', overflow: 'auto' }">
            <nuxt />
          </a-layout-content>
          <a-layout-footer :style="{ textAlign: 'center', height: '50px' }">
            Nuxt-Ant-Admin Created by me-master-me
          </a-layout-footer>
        </a-layout>
      </a-layout>
    </a-layout>
    <nuxt v-else id="page-layout" />
    <div v-show="spinning" class="loading">
      <div class="loader" />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      collapsed: false,
      layoutPage: ['/', '/login']
    }
  },

  computed: {
    spinning () {
      return this.$store.state.basicSet.LOADDING
    },
    sideMenu () {
      return this.$store.state.basicSet.sideMenu
    }
  },
  watch: {
    $route: {
      handler (val) {},
      deep: true,
      immediate: true
    }
  },
  mounted () {},
  methods: {
    handleMenuClick (e) {
      if (e.key === '0') {
        this.$store.commit('basicSet/SET_menuLayout', !this.sideMenu)
      }
    }
  }
}
</script>
<style lang="less" scoped>
#page-layout {
  width: 100%;
  height: 100vh;
  min-width: 1200px;
  overflow-x: auto;
  .ant-menu-horizontal {
    border-bottom: 0;
  }
  .ant-menu-inline {
    border-right: 0;
  }
}
.min-container {
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: row;
  position: relative;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header_left {
  display: flex;
  align-items: center;
}
#page-layout .trigger {
  font-size: 20px;
  margin-bottom: 16px;
  padding: 0 10px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: @primary-color;
}

#page-layout .logo {
  height: 25px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.title {
  font-size: 20px;
  font-weight: 500;
}
/* HTML: <div class="loader"></div> */
.loading{
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    background:rgba(236, 244, 255,.8)
}
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: fit-content;
  padding-bottom: 5px;
  font-weight: bold;
  font-family: monospace;
  font-size: 40px;
  overflow: hidden;
  color: #0000;
  text-shadow: 0 0 0 @primary-color, 10ch 0 0 @primary-color;
  background: linear-gradient(@primary-color 0 0) bottom left/0% 3px no-repeat;
  animation: Loading 1s infinite;
}
.loader:before {
  content: "Loading...";
}
@keyframes Loading {
  80% {
    text-shadow: 0 0 0 @primary-color, 10ch 0 0 @primary-color;
    background-size: 100% 3px;
  }
  100% {
    text-shadow: -10ch 0 0 @primary-color, 0 0 0 @primary-color;
  }
}
</style>
