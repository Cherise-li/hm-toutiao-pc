import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter);

//导入路由组件
import Login from "@/views/login";
import Index from "@/views/index";

//定义路由规则
const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  //首页,完整替换,替换根组件所有内容,所以login和根组件是同一级的
  { path: "/index", component: Index }
];
//初始化路由实例
const router = new VueRouter({ routes });
//导出路由实例
export default router;
