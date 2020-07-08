import Vue from 'vue'
import App from './App.vue'
import router from './router/main.js'
import store from './store'

// 引入自己的插件
import toast from 'components/common/toast'

Vue.config.productionTip = false

// 添加事件总线
Vue.prototype.$bus = new Vue()

// 安装自己的插件toast
Vue.use(toast)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
