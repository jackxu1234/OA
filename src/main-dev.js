import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.css'
import TreeTable from 'vue-table-with-tree-grid'
import VueQuillEditor from 'vue-quill-editor'
// import './plugins/vant.js'
import axios from 'axios'
import qs from 'qs'
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

//配置请求的根路径
axios.defaults.baseURL = 'http://localhost:8080'

// 在request拦截器中，展示进度条
// axios.interceptors.request.use(config => {
//   // console.log(config)
//   NProgress.start()
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   return config
// })
//在response拦截器中，隐藏进度条 NProgress.done()
// axios.interceptors.response.use(config => {
//   NProgress.done()
//   return config
// })

  // get方式请求
export function get(url, params) {
  return axios({
    method: 'get',
    url,
    params, // get 请求时带的参数
    timeout: 5000
  })
}

//  提交post请求 发送的数据为查询字符串，key=val&key=val
export function post(url, data) {
  return axios({
    method: "post",
    url,
    data: qs.stringify(data),
    timeout: 5000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export function put(url, data) {
  return axios({
    method: "put",
    url,
    data: qs.stringify(data,),
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
// 提交post请求 ,查询字符串，对象中嵌套数组的格式
export function post_obj_array(url, data) {
  return axios({
    method: "post",
    url,
    data: qs.stringify(data, { allowDots: true }),
    timeout: 5000
  })
}

/**
 * 提交post请求 发送的数据为查询字符串，当参数为数组的时候适用该方法
 * ids=1&ids=2
*/
export function post_array(url, data) {
  return axios({
    method: "post",
    url,
    data: qs.stringify(data, { arrayFormat: "repeat" }),
    timeout: 5000
  })
}
//  提交post请求 发送的数据为json字符串
export function post_json(url, data) {
  return axios({
    method: "post",
    url,
    data,
    timeout: 5000
  })
}


Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(ElementUI);
//进行全局注册组件
Vue.component('tree-table',TreeTable)
//将富文本编辑器,注册为全局可用的组件
Vue.use(VueQuillEditor)

Vue.filter('dateFormat',function(originVal) {
  const dt = new Date(originVal*1000)

  const year = dt.getFullYear()
  const month = (dt.getMonth() + 1 + '').padStart(2,'0')
  const date = (dt.getDate() + '').padStart(2,'0')

  const hour = (dt.getHours() + '').padStart(2,'0')
  const minute = (dt.getMinutes() + '').padStart(2,'0')
  const second = (dt.getSeconds() + '').padStart(2,'0')

  return `${year}-${month}-${date} ${hour}:${minute}:${second}`
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
