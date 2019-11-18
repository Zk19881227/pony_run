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
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
