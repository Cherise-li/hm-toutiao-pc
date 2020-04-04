import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter);

import user from "@/utils/data";

//导入路由组件
const Login = () => import("@/views/login");
const Index = () => import("@/views/index");
const Welcome = () => import("@/views/welcome");
const Neirong = () => import("@/views/content");
const Sucai = () => import("@/views/sucai");
const Publish = () => import("@/views/publish");
const Notfound = () => import("@/views/notfound");
const Comment = () => import("@/views/comment");
const Fans = () => import("@/views/fans");
const Per = () => import("@/views/per");

//定义路由规则
const routes = [
  { path: "/login", component: Login },
  //首页,完整替换,替换根组件所有内容,所以login和根组件是同一级的
  {
    path: "/",
    component: Index,
    children: [
      { path: "/", component: Welcome },
      { path: "/neirong", component: Neirong },
      { path: "/sucai", component: Sucai },
      { path: "/publish", component: Publish },
      { path: "/comment", component: Comment },
      { path: "/fans", component: Fans },
      { path: "/per", component: Per }
    ]
  },
  { path: "*", component: Notfound }
];
//初始化路由实例
const router = new VueRouter({ routes });
//导航守卫
router.beforeEach((to, from, next) => {
  const data = user.getUser();
  if (to.path !== "/login" && !data.token) return next("/login");
  next();
});

//导出路由实例
export default router;
