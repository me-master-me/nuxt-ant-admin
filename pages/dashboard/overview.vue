<template>
  <VChart :autoresize="true" :options="options" style="width:100%;height:1309px" />
</template>

<script>
export default {
  meta: { title: '工作台' },
  components: {},
  props: {},
  data () {
    return {
      options: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      }
    }
  },
  mounted () {},
  methods: {}
}
</script>
