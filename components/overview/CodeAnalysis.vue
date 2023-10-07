<template>
  <div>
    <VChart :autoresize="true" :options="options" style="width:100%;height:100%" />
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      options: {
        tooltip: { show: true },
        color: ['#f6ad2e', '#412eff', '#f93a0b'],
        grid: [
          {
            left: 0,
            right: '50%',
            top: 0,
            bottom: 0,
            containLabel: true
          }
        ],
        xAxis: [
          {
            splitLine: {
              show: false
            },
            type: 'value',
            show: false
          }
        ],
        yAxis: [
          {
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            type: 'category',
            axisTick: {
              show: false
            },
            inverse: true,
            data: ['HTML', 'CSS', 'JS'],
            axisLabel: {
              color: '#fff',
              fontSize: 20,
              verticalAlign: 'middle',
              align: 'center',
              margin: 30,
              formatter: (name, index) => {
                return `{icon${index}|${name}}`
              },
              rich: {
                icon0: {
                  width: 40,
                  height: 25,
                  backgroundColor: '#f6ad2e'
                },
                icon1: {
                  width: 40,
                  height: 25,
                  backgroundColor: '#412eff'
                },
                icon2: {
                  width: 40,
                  height: 25,
                  backgroundColor: '#f93a0b'
                }
              }
            }
          },
          {
            type: 'category',
            inverse: true,
            axisTick: 'none',
            axisLine: 'none',
            show: true,
            axisLabel: {
              textStyle: {
                color: '#000',
                fontSize: 12
              }
            },
            data: [37899, 28890, 19600]
          }
        ],
        series: [
          {
            type: 'bar',
            barWidth: 10, // 柱子宽度
            MaxSize: 0,
            showBackground: true,
            label: {
              show: false
            },
            data: [
              { name: 'HTML', value: 37899, itemStyle: { color: '#f6ad2e' } },
              { name: 'CSS', value: 28890, itemStyle: { color: '#412eff' } },
              { name: 'JS', value: 19600, itemStyle: { color: '#f93a0b' } }
            ]
          },
          {
            name: '代码统计',
            center: ['75%', '50%'],
            type: 'pie',
            radius: ['30%', '60%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { name: 'HTML', value: 37899 },
              { name: 'CSS', value: 28890 },
              { name: 'JS', value: 19600 }
            ]
          }
        ]
      }
    }
  },
  mounted () {},
  methods: {}
}
</script>

<style scoped>
</style>
