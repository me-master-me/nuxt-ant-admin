<template>
  <div><VChart :autoresize="true" :options="options" style="width:100%;height:100%" /></div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      options: {
        title: {
          text: '近一周代码新增',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        color: ['#3fc55e', '#f04949', '#4955fa'],
        grid: {
          left: '5%',
          top: '15%',
          bottom: '10%',
          right: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: [
          {
            name: 'HTML',
            type: 'line',
            lineStyle: { width: 3 },
            data: [107, 1188, 138, 117, 312, 122, 119],
            markPoint: {
              data: [{ type: 'max', name: 'HTML' }]
            }
          },
          {
            name: 'CSS',
            type: 'line',
            lineStyle: { width: 3 },
            data: [199, 20, 200, 50, 38, 29, 20],
            markPoint: {
              data: [{ type: 'max', name: 'CSS' }]
            }
          },
          {
            name: 'JS',
            type: 'line',
            lineStyle: { width: 3 },
            data: [199, 409, 390, 225, 399, 100, 30],
            markPoint: {
              data: [{ type: 'max', name: 'JS' }]
            }
          }
        ]
      }
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
