//导出配置好的axios,提供给main.js使用

import axios from "axios";
import auth from "@/utils/data";
import router from "@/router";
//导入大数据的转换插件
import JSONbig from "json-bigint";

//进行axios的配置,将来会有很多配置
axios.defaults.baseURL = "http://ttapi.research.itcast.cn/mp/v1_0/";

//在响应拦截之前,修改响应数据
axios.defaults.transformResponse = [
  data => {
    try {
      return JSONbig.parse(data);
    } catch (e) {
      return data;
    }
  }
];
//进行axios默认请求头配置
// axios.defaults.headers.Authorization = `Bearer ${auth.getUser().token}`;
//进行axios请求拦截

axios.interceptors.request.use(
  config => {
    const { token } = auth.getUser();
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  err => Promise.reject(err)
);

//响应拦截器,拦截token失效
axios.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    if (err.response && err.response.status === 401) {
      auth.delUser();
      router.push("/login");
    }
    return Promise.reject(err);
  }
);
//导出axios
export default axios;
