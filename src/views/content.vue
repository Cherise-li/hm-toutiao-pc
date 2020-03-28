<template>
  <div class="content-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑组件 -->
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="80px" size="small">
        <!-- 状态栏 -->
        <el-form-item label="状态:">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 频道栏 -->
        <el-form-item label="频道:">
          <el-select v-model="reqParams.channel_id" placeholder="请选择">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- 日期栏 -->
        <el-form-item label="日期:">
          <div class="block">
            <el-date-picker
              v-model="date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下面的卡片 -->
    <el-card class="box-card" style="margin-top:20px">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <span>根据筛选条件共查询到{{count}}条结果</span>
      </div>
      <!-- 表格 -->
      <el-table :data="articles">
        <el-table-column label="封面"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="发布状态"></el-table-column>
        <el-table-column label="时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background layout="prev, pager, next" :total="90"></el-pagination>
      <!-- :total不能绑定count,未解决-->
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Neirong',
  created() {
    console.log('发起请求')
    this.getData(), this.getChannels()
  },
  methods: {
    async getChannels() {
      try {
        const {
          data: { data }
        } = await this.$http.get('channels')
        this.options = data.channels
      } catch (e) {
        this.$message.error('获取文章频道失败!')
      }
    },
    async getData() {
      try {
        const {
          data: { data }
        } = await this.$http.get('articles', { params: this.reqParams })
        console.log(data)
        this.articles = data.results
        this.count = data.total_count
      } catch (e) {
        this.$message.error('获取文章列表失败!')
      }
    }
  },

  data() {
    return {
      //筛选条件对象数据
      reqParams: {
        //当字段值为null,不会发送给后台
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      //当日期控件选择了日期后,给reqParams中的数据动态赋值
      date: [],
      options: [],
      articles: [],
      count: ''
    }
  }
}
</script>

<style scoped lang="less"></style>
