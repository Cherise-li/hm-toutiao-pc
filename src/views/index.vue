<template>
  <el-container class="home-container">
    <el-aside width="200px" class="aside">
      <!-- 侧边栏区域 -->
      <!-- 顶部logo -->
      <div class="logo"></div>
      <!-- 导航菜单组件 -->
      <el-menu
        default-active="1"
        background-color="#002233"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right:0"
      >
        <!-- 首页 -->
        <el-menu-item index="1">
          <i class="el-icon-s-home"> </i>
          <router-link to="/" slot="title">首页</router-link>
        </el-menu-item>
        <!-- 内容管理 -->
        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          <router-link to="/neirong" slot="title">内容管理</router-link>
        </el-menu-item>
        <!-- 素材管理 -->
        <el-menu-item index="3">
          <i class="el-icon-picture"></i>
          <router-link to="/sucai" slot="title">素材管理</router-link>
        </el-menu-item>
        <!-- 发布文章 -->
        <el-menu-item index="4">
          <i class="el-icon-s-promotion"></i>
          <router-link to="/publish" slot="title">发布文章</router-link>
        </el-menu-item>
        <!-- 评论管理 -->
        <el-menu-item index="5">
          <i class="el-icon-chat-line-square"></i>
          <router-link to="/comment" slot="title">评论管理</router-link>
        </el-menu-item>
        <!-- 粉丝管理 -->
        <el-menu-item index="6">
          <i class="el-icon-present"></i>
          <router-link to="/fans" slot="title">粉丝管理</router-link>
        </el-menu-item>
        <!-- 个人设置 -->
        <el-menu-item index="7">
          <i class="el-icon-menu"></i>
          <router-link to="/per" slot="title">个人设置</router-link>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header">
        <!-- 头部内容 -->
        <!-- 左边区域 -->
        <span class="el-icon-s-fold"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <!-- 右边区域 -->
        <el-dropdown trigger="click" class="right">
          <span class="el-dropdown-link">
            <img src="../assets/images/avatar.jpg" alt="" />
            <span class="text"> 颜颜</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人设置</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
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
export default {
  name: "my-index"
};
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
  }

  .router-link {
    font-size: 30px;
    color: white;
  }
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
