<template>
  <a-row>
    <a-card>
      <a-col v-for="(item,index) in cardList" :key="index" class="card" :span="4">
        <a-card-grid class="cardItem">
          <div class="icon">
            <a-icon :type="item.icon" theme="filled" />
          </div>
          <span class="number">{{ item.number }}</span>
          <span>{{ item.title }}</span>
        </a-card-grid>
        <a-divider style="height: 100%;" type="vertical" />
      </a-col>
    </a-card>
  </a-row>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      cardList: [
        {
          icon: 'message',
          title: '微信分享数量',
          number: 1278
        },
        {
          icon: 'code',
          title: '框架代码数量',
          number: 4999449
        },
        {
          icon: 'fund',
          title: '周下载量',
          number: 9999
        },
        {
          icon: 'dollar-circle',
          title: '组件资产',
          number: 9999
        },
        {
          icon: 'eye',
          title: '周查看数据',
          number: 689288
        },
        {
          icon: 'qq-circle',
          title: 'QQ分享数量',
          number: 78789392
        }
      ]
    }
  },
  mounted () {},
  methods: {}
}
</script>

<style lang='less' scoped>
.cardItem{
    width:100%;
    display: flex;
    font-size: 12px;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    box-shadow: none;
    .icon{
        background: #fee2db;
        border-radius: 50%;
        color: #f93a0b;
        font-size: 30px;
    }
    .anticon{
        margin: 15px;
    }
    .number{
        font-size: 20px;
        font-weight: 500;
        padding: 10px;
    }
}
.card{
    display: flex;
    height: 180px;
}

</style>
