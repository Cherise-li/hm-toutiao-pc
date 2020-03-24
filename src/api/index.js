//导出配置好的axios,提供给main.js使用

import axios from "axios";

//进行axios的配置,将来会有很多配置
axios.defaults.baseURL = "http://ttapi.research.itcast.cn/mp/v1_0/";
//导出axios
export default axios;
