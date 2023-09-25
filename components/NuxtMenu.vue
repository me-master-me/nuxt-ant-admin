<template>
  <a-menu
    mode="inline"
    :default-selected-keys="[$route.path]"
    :default-open-keys="defaultOpenKeys($route.path)"
    @select="select"
  >
    <template v-for="menu in menuList">
      <a-sub-menu v-if="menu.children?.length" :key="menu.path">
        <span slot="title">
          <a-icon :type="menu.icon" /><span>{{ menu?.label||'' }}</span>
        </span>
        <a-menu-item v-for="item in menu.children" :key="item.path">
          <span>{{ item.label }}</span>
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item v-else :key="menu.path">
        <a-icon :type="menu.icon" /><span>{{ menu?.label||'' }}</span>
      </a-menu-item>
    </template>
  </a-menu>
</template>
<script>
export default {
  props: {},
  data () {
    return {
    }
  },
  computed: {
    menuList () {
      return this.$store.state.menu.menuList
    },
    defaultOpenKeys () {
      return function (value) {
        let fullPath = ''
        this.menuList.forEach((element) => {
          if (value.includes(element.path)) {
            fullPath = element.path
          }
        })
        return [fullPath]
      }
    }
  },
  mounted () {},
  methods: {
    select ({ selectedKeys }) {
      this.$router.push(selectedKeys[0])
    }
  }
}
</script>
<style lang="scss" scoped></style>
