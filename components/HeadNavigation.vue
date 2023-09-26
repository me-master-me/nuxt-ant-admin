<template>
  <div id="HeadNavigation">
    <a-radio-group default-value="a" button-style="solid">
      <a-radio-button
        v-for="item in menuList"
        :key="item.path"
        :value="item.path"
      >
        {{ item.label }}
        <a-icon :style="{marginLeft:'5px'}" type="close-circle" @click.prevent="close(item)" />
      </a-radio-button>
    </a-radio-group>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      checked1: false
    }
  },
  computed: {
    menuList () {
      return this.$store.state.menu.menuList
    }
  },
  mounted () {},
  methods: {
    preventDefault (e) {
      console.log(e)
    },
    close (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
