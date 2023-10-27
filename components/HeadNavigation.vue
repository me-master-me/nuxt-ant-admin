<template>
  <div id="HeadNavigation">
    <a-tabs
      v-model="activeKey"
      type="editable-card"
      hide-add
      size="large"
      @change="change"
      @edit="onEdit"
    >
      <a-tab-pane v-for="item in $store.state.user.HeadNavigation" :key="item.path" :tab="item.label" :closable="item.path!== $route.path" />
    </a-tabs>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      activeKey: this.$route.path
    }
  },
  computed: {
    HeadNavigation () {
      return this.$store.state.user.HeadNavigation
    }
  },
  mounted () {
  },
  methods: {
    change (path) {
      this.$router.push(path)
    },
    onEdit (targetKey, action) {
      this.$store.commit(
        'user/REMOVE_Navigation', { path: targetKey }
      )
    }
  }
}
</script>

<style lang="less" scoped>
#HeadNavigation{
    width: calc(100% - 50px);
}
</style>
