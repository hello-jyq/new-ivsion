import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
// 引入基础样式表
import '@/assets/css/reset.css'
// 引入elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入i18n
import i18n from './i18n'
// 引入进度条样式库
import 'nprogress/nprogress.css'
// 引入公共样式表
import '@/assets/css/common.scss'
// 引入字体图标css (字体图标的使用：iconfont icon-**）
import '@/assets/fonts/index.css'
// 主题换色
import '@/assets/css/theme.scss'
// 路由守卫与动态路由处理
import './permission.js'
import '@/utils/array.js'

Vue.use(ElementUI)
Vue.config.productionTip = false

window.vmi8n = new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
