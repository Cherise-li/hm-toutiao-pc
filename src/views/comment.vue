<template>
  <div class="comment-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑组件 -->
        <my-bread>评论管理</my-bread>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="文章标题"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="评论状态">
          <template slot-scope="scope">{{ scope.row.comment_status?'正常':'关闭' }}</template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button
              @click="toggleStatus(scope.row)"
              v-if="scope.row.comment_status"
              type="danger"
              size="small"
            >关闭评论</el-button>
            <el-button @click="toggleStatus(scope.row)" v-else type="success" size="small">打开评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="count"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changePage"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'my-comment',
  data() {
    return {
      reqParams: {
        page: 1,
        per_page: 20,
        response_type: 'comment'
      },
      tableData: [],
      count: 0
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async toggleStatus(row) {
      try {
        const {
          data: { data }
        } = await this.$http.put(`comments/status?article_id=${row.id}`, {
          allow_comment: !row.comment_status
        })
        this.$message.success(
          data.allow_comment ? '打开评论成功' : '关闭评论成功'
        )
        row.comment_status = data.allow_comment
      } catch (e) {
        this.$message.error('操作失败')
      }
    },
    changePage(newPage) {
      this.reqParams.page = newPage
      this.getData()
    },
    //获取评论列表
    async getData() {
      try {
        const {
          data: { data }
        } = await this.$http.get('articles', { params: this.reqParams })
        this.tableData = data.results
        this.count = data.total_count
      } catch (e) {
        ;('获取列表失败')
      }
    }
  }
}
</script>

<style scoped lang='less'></style>