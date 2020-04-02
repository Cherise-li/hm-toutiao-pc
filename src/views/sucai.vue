<template>
  <div class="sucai-container">
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <!-- 卡片头部 -->
      <div slot="header" class="clearfix">
        <!-- 面包屑组件 -->
        <my-bread>素材管理</my-bread>
      </div>

      <!-- 卡片内容 -->
      <div>
        <el-radio-group
          @change="changeCollect()"
          v-model="reqParams.collect"
          size="small"
        >
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button
          @click="dialogVisible = true"
          type="success"
          size="small"
          style="float:right"
          >添加素材</el-button
        >
      </div>
      <!-- 图片区域 -->
      <div>
        <div class="img" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="icon" v-if="reqParams.collect === false">
            <span
              class="el-icon-star-off"
              :style="{ color: item.is_collected ? 'red' : '#fff' }"
              @click="collected(item.id, item.is_collected)"
            ></span>
            <span class="el-icon-delete" @click="delCollect(item.id)"></span>
          </div>
        </div>
        <div class="div" v-if="images.length === 0">暂无数据</div>
      </div>

      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="reqParams.per_page"
        :total="count"
        :current-page="reqParams.page"
        @current-change="changePage"
      ></el-pagination>
    </el-card>

    <!-- 添加素材 -->
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        name="image"
        :headers="headers"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import auth from "@/utils/data";
export default {
  name: "sucai",
  data() {
    return {
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      count: 0,
      images: [],
      dialogVisible: false,
      //上传成功后的图片地址
      imageUrl: "",
      headers: { Authorization: `Bearer ${auth.getUser().token}` }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // openAddDialog() {
    //   this.dialogVisible = true
    // },
    handleAvatarSuccess(res) {
      this.imageUrl = res.data.url;
      this.$message.success("上传图片成功");
      setTimeout(() => {
        this.dialogVisible = false;
        this.getData();
        this.reqParams.page = 1;
        this.imageUrl = null;
      }, 2000);
    },
    //获取素材列表
    async getData() {
      const {
        data: { data }
      } = await this.$http.get("user/images", { params: this.reqParams });
      this.count = data.total_count;
      this.images = data.results;
    },
    changePage(newPage) {
      this.reqParams.page = newPage;
      this.getData();
    },
    async collected(id, status) {
      try {
        const {
          data: { data }
        } = await this.$http.put(`user/images/${id}`, {
          collect: !status
        });
        //data中的collect是修改后的图片状态
        this.$message.success(data.collect ? "收藏成功" : "取消收藏成功");
        //视图: 收藏按钮颜色样式,数据驱动视图
        this.getData();
        // item.is_collected = data.collect
      } catch (e) {
        this.$message.error("操作失败");
      }
    },
    delCollect(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            await this.$http.delete(`user/images/${id}`);
            this.$message.success("删除成功!");
            this.getData();
          } catch (e) {
            this.$message.error("删除失败!");
          }
        })
        .catch(() => {});
    },
    changeCollect() {
      this.reqParams.page = 1;
      this.getData();
    }
  }
};
</script>

<style scoped lang="less">
.img {
  display: inline-block;
  position: relative;
  width: 180px;
  height: 180px;
  margin: 20px 50px 20px 0;
  img {
    width: 100%;
    height: 100%;
    border: 1px dashed #ccc;
  }
  .icon {
    position: absolute;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: aliceblue;
    span {
      margin: 0 30px;
    }
  }
}
</style>
