<template>
  <a-breadcrumb separator=">">
    <a-breadcrumb-item v-for="item in breadCrumbList" :key="item.title">
      {{ item?.title }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
export default {
  components: {},
  props: {
    // breadCrumbList: {
    //   type: Array,
    //   default: () => {
    //     return []
    //   }
    // }
  },
  data () {
    return {
      breadCrumbList: []
    }
  },
  computed: {
  },
  watch: {
    $route: {
      handler (val) {
        if (process.client) {
          this.breadCrumbList = this.$nuxt.context.route.meta
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {},
  methods: {}
}
</script>

<style scoped>
</style>
