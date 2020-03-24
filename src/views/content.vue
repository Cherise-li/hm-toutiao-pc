<template>
  <div class="content-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <strong>首页</strong>
        <i class="el-icon-arrow-right"></i>
        <span>内容管理</span>
      </div>
      <!-- 状态栏 -->
      <el-form label-width="70px" class="demo-ruleForm">
        <el-form-item label="状态:">
          <el-radio-group v-model="radio">
            <el-radio :label="1">全部</el-radio>
            <el-radio :label="2">草稿</el-radio>
            <el-radio :label="3">待审核</el-radio>
            <el-radio :label="4">审核通过</el-radio>
            <el-radio :label="5">审核失败</el-radio>
            <el-radio :label="6">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <!-- 频道栏 -->
      <el-form label-width="70px" class="demo-ruleForm">
        <el-form-item label="频道:">
          <select name="" id="">
            <option value=""></option>
            <option value="">c++</option>
            <option value="">c++</option>
          </select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Neirong",
  data() {
    return {
      radio: "label"
    };
  }
};
</script>

<style scoped lang="less"></style>
