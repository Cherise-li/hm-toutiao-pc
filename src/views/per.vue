<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑组件 -->
        <my-bread>个人设置</my-bread>
      </div>

      <!-- 主体内容 -->
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="编号: ">{{ id }}</el-form-item>
        <el-form-item label="手机号: ">{{ mobile }}</el-form-item>
        <el-form-item label="媒体名称: ">
          <el-input v-model="form.name" style="width:500px"></el-input>
        </el-form-item>

        <el-form-item label="媒体介绍: ">
          <el-input
            type="textarea"
            :rows="3"
            v-model="form.intro"
            style="width:500px"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱: ">
          <el-input v-model="form.email" style="width:500px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存设置</el-button>
        </el-form-item>
      </el-form>

      <!-- 头像区域 -->
      <div class="img">
        <el-upload
          class="avatar-uploader"
          action=""
          :http-request="handleAvatarSuccess"
          :show-file-list="false"
        >
          <img v-if="photo" :src="photo" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <p>修改头像</p>
      </div>
    </el-card>
  </div>
</template>

<script>
import eventBus from "@/utils/eventBus";
import auth from "@/utils/data";

export default {
  name: "per",
  data() {
    return {
      form: {
        name: "",
        intro: "",
        email: ""
      },
      id: "",
      mobile: "",
      photo: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const {
          data: { data }
        } = await this.$http.get("user/profile");
        this.id = data.id;
        this.mobile = data.mobile;
        this.form.name = data.name;
        this.form.intro = data.intro;
        this.form.email = data.email;
        this.photo = data.photo;
      } catch (e) {
        this.$message.error("获取信息失败");
      }
    },
    async onSubmit() {
      try {
        const {
          data: { data }
        } = await this.$http.patch("user/profile", this.form);
        this.$message.success("修改信息成功");
        eventBus.$emit("eventFormA", data.name);
        const user = auth.getUser();
        user.name = data.name;
        auth.setUser(user);
      } catch (e) {
        if (e.response && e.response.status === 409) {
          this.$message.error("用户名已存在");
        } else {
          this.$message.error("修改信息失败");
        }
      }
    },
    async handleAvatarSuccess({ file }) {
      const formData = new FormData();
      formData.append("photo", file);
      try {
        const {
          data: { data }
        } = await this.$http.patch("user/photo", formData);
        this.$message.success("上传成功");
        this.photo = data.photo;
        eventBus.$emit("upPhoto", data.photo);
        const user = auth.getUser();
        user.photo = data.photo;
        auth.setUser(user);
      } catch (e) {
        this.$message.error("上传失败");
      }
    }
  }
};
</script>

<style scoped lang="less">
.box-card {
  position: relative;
  .img {
    position: absolute;
    top: 100px;
    right: 200px;
    text-align: center;
  }
}
</style>
