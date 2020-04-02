<template>
  <div class="fans-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑组件 -->
        <my-bread>粉丝管理</my-bread>
      </div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <div class="img_list">
            <div class="img_item" v-for="item in images" :key="item.id">
              <div class="img">
                <img :src="item.photo" />
              </div>
              <p>{{item.name}}</p>
              <el-button type="primary" plain size="mini">+关注</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="image">粉丝画像内容</el-tab-pane>
      </el-tabs>

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
  name: 'fans',
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        let {
          data: { data }
        } = await this.$http.get('followers', {
          params: this.reqParams
        })
        this.count = data.total_count
        this.images = data.results
      } catch (e) {
        this.$message.error('获取粉丝列表失败!')
      }
    },
    changePage(newPage) {
      this.reqParams.page = newPage
      this.getData()
    }
  },
  data() {
    return {
      reqParams: {
        page: 1,
        per_page: 24
      },
      images: [],
      activeName: 'list',
      count: 0
    }
  }
}
</script>

<style scoped lang='less'>
.img_list {
  text-align: center;
  .img_item {
    display: inline-block;
    width: 100px;
    height: 170px;
    padding-top: 10px;
    margin: 0 50px 20px 0;
    border: 1px dashed #dddddd;
    .img {
      width: 80px;
      height: 80px;
      line-height: 80px;
      border: 1px solid #dddddd;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>