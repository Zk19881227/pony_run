import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
// 导入全局样式表
import './assets/css/globle.css'
// 导入字体图标
import './assets/font/iconfont.css'
// 导入axios
import axios from 'axios'
// 导入图片懒加载
// import VueLazyload from 'vue-lazyload'
// Vue.use(VueLazyload)

// 全局注册axios
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://www.liulongbin.top:3005/'
Vue.config.productionTip = false
// 注册时间过滤器组件
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
