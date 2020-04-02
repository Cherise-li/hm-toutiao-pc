<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑组件 -->
        <my-bread>评论管理</my-bread>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="文章标题"></el-table-column>
        <el-table-column prop="name" label="总评论数"></el-table-column>
        <el-table-column prop="address" label="粉丝评论数"></el-table-column>
        <el-table-column prop="date" label="评论状态"></el-table-column>
        <el-table-column prop="name" label="操作"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'comment',
  data() {
    return {
      reqParams: {
        type: a,
        source: null,
        offset: null,
        limit: null
      },
      tableData: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        const res = await this.$http.get('comments', { params: this.reqParams })
        console.log(res)
      } catch (e) {
        ;('获取列表失败')
      }
    }
  }
}
</script>

<style scoped lang='less'></style>