<template>
  <a-layout v-if="!layoutPage.includes($route.path)" id="page-layout">
    <a-layout-header class="header" :style="{background: '#fff' }">
      <NuxtLogo class="logo" />
      <div> Nuxt-Ant-Admin</div>
      <!-- <NuxtMenu /> -->
    </a-layout-header>
    <a-layout style=" background: #fff" class="min-container">
      <a-layout-sider width="240" style="background: #fff; overflow: auto">
        <NuxtMenu />
      </a-layout-sider>
      <a-layout class="page-content">
        <a-layout-header class="header" :style="{background: '#fff', width: '100%' }">
          <!-- <BreadCrumb /> -->
          <HeadNavigation />
        </a-layout-header>
        <a-layout-content :style="{ padding: '0',overflow: 'auto'}">
          <nuxt />
        </a-layout-content>
        <a-layout-footer :style="{ textAlign: 'center' }">
          Nuxt-Ant-Admin Created by me-master-me
        </a-layout-footer>
        </a-layout-header>
      </a-layout>
    </a-layout>
  </a-layout>
  <nuxt v-else id="page-layout" />
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
    menuList () {
      return this.$nuxt.context.route.meta
    }
  },
  watch: {
    isCollapse: {
      handler (nval, oval) {
        nval ? (this.width = '64px') : (this.width = '240px')
      },
      deep: true,
      immediate: true
    },
    $route: {
      handler (val) {
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
#page-layout {
  width: 100%;
  height: 100vh;
  min-width: 1440px;
  overflow-x: auto;
  //   position: relative;
}
.min-container {
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: row;
  position: relative;
}
.header{
    display: flex;
    align-items: center;
}
#page-layout .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
