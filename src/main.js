import Vue from "vue";
import App from "./App.vue";
//引入组件
import ElementUi from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUi);

//导入路由实例
import router from "./router/index";

Vue.config.productionTip = false;

new Vue({
  //挂载到根实例:当地址栏的hash出现/#/,说明挂载成功
  router,
  render: h => h(App)
}).$mount("#app");
