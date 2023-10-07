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
          text: '项目工期',
          left: 'center',
          padding: 20,
          textStyle: {
            fontSize: 17,
            fontWeight: 'bolder',
            color: '#333'
          },
          subtextStyle: {
            fontSize: 13,
            fontWeight: 'bolder'
          }
        },
        legend: {
          data: ['技术选型', '架构搭建', '评审效果图', '绘制静态页面', '接口对接'],
          align: 'right',
          right: 80,
          top: 50
        },
        grid: {
          containLabel: true,
          right: '5%',
          left: '5%',
          bottom: '5%',
          top: '15%'
        },
        xAxis: {
          type: 'time',
          boundaryGap: ['0%', '0%'],
          axisLabel: {
            show: true,
            hideOverlap: true,
            interval: 0,
            formatter: '{yyyy}-{MM}-{dd}'
          }
        },
        yAxis: {
          axisLabel: {
            show: true,
            interval: 0,
            formatter: function (value, index) {
              let last = ''
              const max = 5
              const len = value.length
              const hang = Math.ceil(len / max)
              if (hang > 1) {
                for (let i = 0; i < hang; i++) {
                  const start = i * max
                  const end = start + max
                  const temp = value.substring(start, end) + '\n'
                  last += temp // 凭借最终的字符串
                }
                return last
              } else {
                return value
              }
            }
          },
          data: ['计划工期', '实际工期']
        },
        tooltip: {
          trigger: 'axis',
          hideOverlap: true,
          formatter: function (params) {
            let res = ''
            let name = ''
            let start0 = ''
            let start = ''
            let end0 = ''
            let end = ''
            for (const i in params) {
              const k = i % 2
              if (!k) { // 偶数
                start0 = params[i].data
                start = start0.getFullYear() + '-' + (start0.getMonth() + 1) + '-' + start0.getDate()
              }
              if (k) { // 奇数
                name = params[i].seriesName
                end0 = params[i].data
                end = end0.getFullYear() + '-' + (end0.getMonth() + 1) + '-' + end0.getDate()
                res += name + ' : ' + end + '~' + start + '</br>'
              }
            }
            return res
          }
        },
        series: [{
          name: '技术选型',
          type: 'bar',
          stack: '总量0',
          label: {
            normal: {
              show: true,
              color: '#000',
              position: 'right',
              formatter: function (params) {
                return params.seriesName
              }
            }
          },
          itemStyle: {
            normal: {
              color: 'skyblue',
              borderColor: '#fff',
              borderWidth: 2
            }
          },
          zlevel: -1,
          data: [new Date('2023-01-05'), new Date('2023-1-14')]
        },
        {
          name: '技术选型',
          type: 'bar',
          stack: '总量0',
          itemStyle: {
            normal: {
              color: 'white'
            }
          },
          zlevel: -1,
          z: 3,
          data: [new Date('2023-01-01'), new Date('2023-01-01')]
        },
        {
          name: '架构搭建',
          type: 'bar',
          stack: '总量2',
          label: {
            normal: {
              show: true,
              color: '#000',
              position: 'right',
              formatter: function (params) {
                return params.seriesName
              }
            }
          },
          itemStyle: {
            normal: {
              color: 'green',
              borderColor: '#fff',
              borderWidth: 2
            }
          },
          zlevel: -1,
          data: [new Date('2023-01-15'), new Date('2023-01-20')]
        },
        {
          name: '架构搭建',
          type: 'bar',
          stack: '总量2',
          itemStyle: {
            normal: {
              color: 'white'
            }
          },
          zlevel: -1,
          z: 3,
          data: [new Date('2023-01-05'), new Date('2023-01-15')]
        },
        {
          name: '评审效果图',
          type: 'bar',
          stack: '总量3',
          label: {
            normal: {
              show: true,
              color: '#000',
              position: 'right',
              formatter: function (params) {
                return params.seriesName
              }
            }
          },
          itemStyle: {
            normal: {
              color: 'red',
              borderColor: '#fff',
              borderWidth: 2
            }
          },
          zlevel: -1,
          data: [new Date('2023-02-20'), new Date('2023-01-20')]
        },
        {
          name: '评审效果图',
          type: 'bar',
          stack: '总量3',
          itemStyle: {
            normal: {
              color: 'white'
            }
          },
          zlevel: -1,
          z: 3,
          data: [new Date('2023-02-01'), new Date('2023-01-12')]
        },
        {
          name: '绘制静态页面',
          type: 'bar',
          stack: '总量4',
          label: {
            normal: {
              show: true,
              color: '#000',
              position: 'right',
              formatter: function (params) {
                return params.seriesName
              }
            }
          },
          itemStyle: {
            normal: {
              color: 'brown',
              borderColor: '#fff',
              borderWidth: 2
            }
          },
          zlevel: -1,
          data: [new Date('2023-03-09'), new Date('2023-01-25')]
        },
        {
          name: '绘制静态页面',
          type: 'bar',
          stack: '总量4',
          itemStyle: {
            normal: {
              color: 'white'
            }
          },
          zlevel: -1,
          z: 3,
          data: [new Date('2023-02-25'), new Date('2023-01-21')]
        },
        {
          name: '接口对接',
          type: 'bar',
          stack: '总量5',
          label: {
            normal: {
              show: true,
              color: '#000',
              position: 'right',
              formatter: function (params) {
                return params.seriesName
              }
            }
          },
          itemStyle: {
            normal: {
              color: 'yellow',
              borderColor: '#fff',
              borderWidth: 2
            }
          },
          zlevel: -1,
          data: [new Date('2023-03-12'), new Date('2023-02-15')]
        },
        {
          name: '接口对接',
          type: 'bar',
          stack: '总量5',
          itemStyle: {
            normal: {
              color: 'white'
            }
          },
          zlevel: -1,
          z: 3,
          data: [new Date('2023-03-10'), new Date('2023-01-26')]
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
