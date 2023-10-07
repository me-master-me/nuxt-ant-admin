<template>
  <div><VChart :autoresize="true" :options="options" style="width:100%;height:100%" /></div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      xData: [this.getNextDate(new Date(), '-6'), this.getNextDate(new Date(), '-5'), this.getNextDate(new Date(), '-4'), this.getNextDate(new Date(), '-3'), this.getNextDate(new Date(), '-2'), this.getNextDate(new Date(), '-1'), this.getNextDate(new Date(), '0')],
      downloadData: [4, 7, 12, 9, 10, 14, 9],
      browseData: [56, 88, 143, 80, 111, 124, 77]
    }
  },
  computed: {
    options () {
      return {
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function (params) {
            let str = ''
            // let str = params[0].seriesName + '：' + params[0].value + '</br>';
            let str1 = ''
            for (let i = 0; i < params.length; i++) {
              if (i % 2 !== 0) {
                if (params[i].value || params[i].value !== undefined) {
                  str += params[i].seriesName + '：' + params[i].value + '</br>'
                  str1 = params[i].name + '</br>' + str
                }
              }
            }
            return str1
          }
        },
        legend: {
          top: 'top',
          itemWidth: 15,
          itemHeight: 8
        },
        grid: {
          left: '5%',
          top: '15%',
          bottom: '10%',
          right: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.xData,
          axisLabel: {
            color: '#333'
          },
          axisLine: {
            lineStyle: {
              color: '#333',
              width: 1
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          axisLine: {
            lineStyle: {
              color: '#333',
              width: 1
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed', // y轴分割线类型
              color: 'rgba(0, 0, 0, 0.30)'
            }
          },
          axisTick: {
            show: false
          }
        },

        series: [
          {
            name: '下载量',
            type: 'bar',
            data: this.downloadData,
            barWidth: 10,
            stack: '总量',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  textStyle: {
                    color: '#000'
                  },
                  position: 'top'
                },
                borderWidth: 5,
                color: 'rgba(244,160,81,1)'
              }
            }
          },
          {
            name: '下载量',
            type: 'line',
            data: this.downloadData,
            stack: '总量12',
            color: 'rgba(244,160,81,1)'
          },
          {
            name: '用户访问量',
            type: 'bar',
            data: this.browseData,
            barWidth: 10,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  textStyle: {
                    color: '#000'
                  },
                  position: 'top'
                },
                borderWidth: 5,
                color: 'rgba(33,195,248,1)'
              }
            }
          }, {
            name: '用户访问量',
            type: 'line',
            data: this.browseData,
            stack: '总量21',
            color: 'rgba(33,195,248,1)'
          }
        ]
      }
    }
  },
  mounted () {
    // this.xData =
  },
  methods: {
    getNextDate (date, day) {
      const dd = new Date(date)
      // 对于day一定要Number
      dd.setDate(dd.getDate() + Number(day))
      const y = dd.getFullYear()
      const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1
      const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate()
      return y + '-' + m + '-' + d
    }
  }
}
</script>

<style scoped>
</style>
