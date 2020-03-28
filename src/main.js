import Vue from "vue";
import App from "@/App.vue";
//引入组件
import ElementUi from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUi);
//导入自己的插件
import plugin from "@/utils/plugin";
Vue.use(plugin);

//导入路由实例
import router from "@/router/index";
//导入axios
import axios from "@/api";
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
  //挂载到根实例:当地址栏的hash出现/#/,说明挂载成功
  router,
  render: h => h(App)
}).$mount("#app");
