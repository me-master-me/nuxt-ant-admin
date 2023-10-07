<template>
  <div style="width: 100%; height: 100%">
    <HeadStatistics />
    <a-row :gutter="16">
      <a-col :span="12" style="margin: 20px 0;">
        <CodeAnalysis class="chartBox" />
      </a-col>
      <a-col :span="12" style="margin: 20px 0;">
        <BrowseData class="chartBox" />
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="24" style="margin: 20px 0;">
        <AddData class="chartBox" />
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="24" style="margin: 20px 0;">
        <ProjectPlan class="ProjectPlan" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import HeadStatistics from '~/components/overview/HeadStatistics.vue'
import CodeAnalysis from '~/components/overview/CodeAnalysis.vue'
import BrowseData from '~/components/overview/BrowseData.vue'
import AddData from '~/components/overview/AddData.vue'
import ProjectPlan from '~/components/overview/ProjectPlan.vue'
export default {
  meta: { title: '工作台' },
  components: { HeadStatistics, CodeAnalysis, BrowseData, AddData, ProjectPlan },
  props: {},
  data () {
    return {
    }
  },
  mounted () {},
  methods: {}
}
</script>
<style lang="less" scoped>
.chartBox{
    height: 300px;
    background: #fff;
    border-radius: 5px;
}
.ProjectPlan{
    height: 500px;
    background: #fff;
    border-radius: 5px;
}
</style>
