<template>
  <div class="login-container">
    <!-- 全屏容器 -->
    <el-card class="my-card">
      <img src="../assets/images/logo_index.png" alt />

      <el-form :model="loginForm" :rules="loginRules" status-icon ref="ruleForm">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:200px"></el-input>
          <el-button style="margin-left:20px">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已经阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import user from '@/utils/data'
export default {
  name: 'my-login',
  data() {
    //自定义校验含糊
    const checkMobile = (rule, value, callback) => {
      //校验valuE的值,约定手机格式: 1开头,第二个数字3-9之间,9个数字结尾
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机格式不正确'))
      }
    }
    const checkCode = (rule, value, callback) => {
      //校验code的值,必须是数字
      if (/^\d{6}$/.test(value)) {
        callback()
      } else {
        callback(new Error('验证码是数字'))
      }
    }
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          {
            len: 6,
            message: '验证码为6位',
            trigger: 'blur'
          },
          { validator: checkCode, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login(ruleForm) {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          // this.$http
          //   .post('authorizations', this.loginForm)
          //   .then(res => {
          //     console.log(res)
          //     user.setUser(res.data.data)
          //     this.$router.push('/')
          //   })
          //   .catch(() => {
          //     this.$message.error('手机号或验证码错误!')
          //   })
          try {
            const res = await this.$http.post('authorizations', this.loginForm)
            user.setUser(res.data.data)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号或验证码错误!')
          }
        }
      })
    }
  }
}
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
