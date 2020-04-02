<template>
  <div class="cover-container">
    <!-- 图片按钮 -->
    <div class="img_btn" @click="openDialog">
      <img :src="value || coverImage" />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <!-- tab选项卡 -->
      <div class="tab">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="素材库" name="sucai">
            <!-- 单选框 -->
            <el-radio-group @change="changeCollect" v-model="reqParams.collect" size="small">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
            <!-- 图片列表 -->
            <div class="img_list">
              <div
                @click="selectImage(item.url)"
                :class="{ selected: item.url === selectUrl }"
                class="img_item"
                v-for="item in images"
                :key="item.id"
              >
                <img :src="item.url" alt />
              </div>
            </div>
            <!-- 分页器 -->
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="reqParams.per_page"
              :total="count"
              :current-page="reqParams.page"
              @current-change="changePage"
              hide-on-single-page
            ></el-pagination>
          </el-tab-pane>
          <el-tab-pane label="上传图片" name="upload">
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
          </el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import auth from '@/utils/data'
import defaultImage from '@/assets/images/default.png'
export default {
  name: 'my-cover',
  props: ['value'],
  data() {
    return {
      dialogVisible: false,
      activeName: 'sucai',
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      images: [],
      count: 0,
      selectUrl: null,
      imageUrl: '',
      coverImage: defaultImage,
      headers: { Authorization: `Bearer ${auth.getUser().token}` }
    }
  },

  methods: {
    uploadImage() {
      if (this.activeName === 'sucai') {
        if (!this.selectUrl) {
          return this.$message.warning('请选择一张图片!')
        }
        // this.coverImage = this.selectUrl
        this.$emit('input', this.selectUrl)
      }
      if (this.activeName === 'upload') {
        if (!this.imageUrl) {
          return this.$message.warning('请选择一张图片!')
        }
        // this.coverImage = this.imageUrl
        this.$emit('input', this.imageUrl)
      }
      this.dialogVisible = false
    },
    selectImage(url) {
      this.selectUrl = url
    },
    handleAvatarSuccess(res) {
      this.imageUrl = res.data.url
      this.$message.success('上传图片成功')
    },
    openDialog() {
      this.activeName = 'sucai'
      this.selectUrl = null
      this.imageUrl = null
      this.dialogVisible = true
      this.getData()
    },
    async getData() {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.count = data.total_count
      this.images = data.results
    },
    changePage(newPage) {
      this.reqParams.page = newPage
      this.getData()
    },
    changeCollect() {
      this.reqParams.page = 1
      this.getData()
    }
  }
}
</script>

<style scoped lang="less">
.img_btn {
  margin-top: 10px;
  width: 150px;
  height: 150px;
  border: 1px dashed #dddddd;
  img {
    width: 100%;
    height: 100%;
  }
}
.img_list {
  margin-top: 15px;

  .img_item {
    position: relative;
    display: inline-block;
    margin-right: 15px;
    width: 150px;
    height: 120px;
    border: 1px dashed #dddddd;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    &.selected::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.3) url(../assets/images/selected.png)
        no-repeat center / 50px 50px;
      width: 150px;
      height: 120px;
    }
  }
}
</style>
