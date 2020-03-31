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
          <el-select
            @change="kongChannel"
            clearable
            v-model="reqParams.channel_id"
            placeholder="请选择"
          >
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
              value-format="yyyy-MM-dd"
              @change="changeDate"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="filter">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下面的卡片 -->
    <el-card class="box-card" style="margin-top:20px">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <span>根据筛选条件共查询到{{ count }}条结果</span>
      </div>
      <!-- 表格 -->
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image
              fit="cover"
              :src="scope.row.cover.images[0]"
              style=" width:150px;height:120px"
            >
              <div slot="error" class="image-slot">
                <img src="@/assets/images/error.gif" alt style=" width:150px;height:120px" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="发布状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0">草稿</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag type="info" v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row.id)" type="primary" icon="el-icon-edit" circle plain></el-button>
            <el-button
              @click="delArticle(scope.row.id)"
              type="danger"
              icon="el-icon-delete"
              circle
              plain
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="reqParams.per_page"
        :total="count"
        :current-page="reqParams.page"
        @current-change="changePage"
      ></el-pagination>
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

        this.articles = data.results
        this.count = data.total_count
      } catch (e) {
        this.$message.error('获取文章列表失败!')
      }
    },
    changePage(newPge) {
      //根据新的页码,重新获取列表数据即可
      this.reqParams.page = newPge
      this.getData()
    },
    changeDate(dateArr) {
      if (dateArr !== '') {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      }
    },
    filter() {
      this.reqParams.page = 1
      this.getData()
    },
    kongChannel(value) {
      if (value === '') {
        this.reqParams.channel_id = null
      }
    },
    edit(id) {
      this.$router.push(`/publish?id=${id}`)
    },
    delArticle(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          try {
            await this.$http.delete(`articles/${id}`)
            this.$message.success('删除成功!')
            this.getData()
          } catch (e) {
            this.$message.error('删除失败!')
          }
        })
        .catch(() => {})
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
      count: 0
    }
  }
}
</script>

<style scoped lang="less"></style>
