<template>
  <div class="login-container">
    <!-- 全屏容器 -->
    <el-card class="my-card">
      <img src="../assets/images/logo_index.png" alt="" />

      <el-form>
        <el-form-item>
          <el-input
            v-model="loginForm.mobile"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:200px"
          >
          </el-input>
          <el-button style="margin-left:20px">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">
            我已经阅读并同意用户协议和隐私条款
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "my-login",
  data() {
    return {
      loginForm: {
        mobile: "",
        code: ""
      }
    };
  }
};
</script>

<style scoped lang="less">
.login-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: url(../assets/images/login_bg.jpg) no-repeat center/cover;
  .my-card {
    position: absolute;
    width: 400px;
    height: 350px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
    img {
      display: block;
      width: 200px;
      margin: 0 auto 20px;
    }
  }
}
</style>
