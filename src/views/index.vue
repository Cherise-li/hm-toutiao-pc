<template>
  <el-container class="home-container">
    <el-aside :width="isOpen?'200px':'68px'" class="aside">
      <!-- 侧边栏区域 -->
      <!-- 顶部logo -->
      <div class="logo" :class="{minLogo:!isOpen}"></div>
      <!-- 导航菜单组件 -->
      <el-menu
        :default-active="$route.path"
        background-color="#002233"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right:0"
        :collapse="!isOpen"
        :collapse-transition="false"
        router
      >
        <!-- 首页 -->
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <!-- 内容管理 -->
        <el-menu-item index="/neirong">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <!-- 素材管理 -->
        <el-menu-item index="/sucai">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <!-- 发布文章 -->
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <!-- 评论管理 -->
        <el-menu-item index="/comment">
          <i class="el-icon-chat-line-square"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <!-- 粉丝管理 -->
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <!-- 个人设置 -->
        <el-menu-item index="/per">
          <i class="el-icon-menu"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header">
        <!-- 头部内容 -->
        <!-- 左边区域 -->
        <span class="el-icon-s-fold" @click="kh()"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <!-- 右边区域 -->
        <el-dropdown trigger="click" class="right" @command="handleClick">
          <span class="el-dropdown-link">
            <img :src="photo" alt />
            <span class="text">{{name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import user from '@/utils/data'
export default {
  name: 'my-index',
  data() {
    return {
      isOpen: 'true',
      name: '',
      photo: ''
    }
  },
  created() {
    const data = user.getUser()
    this.name = data.name
    this.photo = data.photo
  },
  methods: {
    kh() {
      this.isOpen = !this.isOpen
    },
    setting() {
      this.$router.push('/per')
    },
    logout() {
      user.delUser()
      this.$router.push('/login')
    },
    handleClick(command) {
      console.log('ok')

      this[command]()
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .aside {
    background-color: #002233;
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url(../assets/images/logo_admin.png) no-repeat
        center/140px auto;
    }
    .minLogo {
      background-image: url(../assets/images/logo_admin_01.png);
      background-size: 36px auto;
    }
  }

  // .router-link {
  //   font-size: 30px;
  //   color: white;
  // }
  .header {
    border-bottom: 1px solid #ccc;
    line-height: 60px;
    .el-icon-s-fold {
      font-size: 24px;
      vertical-align: middle;
    }
    .text {
      margin-left: 20px;
    }
    .right {
      float: right;
    }
    .el-dropdown-link {
      line-height: 60px;
      img {
        height: 30px;
        vertical-align: middle;
      }
      .text {
        margin-left: 20px;
      }
    }
  }
}
</style>
