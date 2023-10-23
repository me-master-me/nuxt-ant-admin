<template>
  <div id="HeadNavigation">
    <a-tabs v-model="activeKey" type="editable-card" hide-add>
      <a-tab-pane v-for="item in [...menuList]" :key="item.path" :tab="item.label" :closable="item.path=='/dashboard'" />
    </a-tabs>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      checked1: false,
      activeKey: this.$route.path
    }
  },
  computed: {
    menuList () {
      return this.$store.state.user.menuList
    }
  },
  mounted () {},
  methods: {
  }
}
</script>

<style lang="less" scoped>
#HeadNavigation{
    width: calc(100% - 50px);
}
</style>
