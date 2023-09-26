<template>
  <a-menu
    :mode="mode"
    :default-selected-keys="[$route.path]"
    :default-open-keys="defaultOpenKeys($route.path)"
  >
    <template v-for="menu in menuList">
      <a-sub-menu v-if="menu.children?.length" :key="menu.path">
        <span slot="title">
          <a-icon :type="menu.icon" /><span>{{ menu?.label||'' }}</span>
        </span>
        <a-menu-item v-for="item in menu.children" :key="item.path" @click="select(item)">
          <span>{{ item.label }}</span>
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item v-else :key="menu.path" @click="select(menu)">
        <a-icon :type="menu.icon" /><span>{{ menu?.label||'' }}</span>
      </a-menu-item>
    </template>
  </a-menu>
</template>
<script>
export default {
  props: {
    mode: {
      type: String,
      default: () => {
        return 'inline'
      }
    }
  },
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
        if (this.mode === 'horizontal') { return [] }
        return [fullPath]
      }
    }
  },
  mounted () {},
  methods: {
    select (menuItem) {
      this.$router.push(menuItem.path)
    }
  }
}
</script>
<style lang="scss" scoped></style>
