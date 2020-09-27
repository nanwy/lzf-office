import Vue from 'vue'
import App from './App.vue'
import 'assets/css/index.scss'
import 'assets/css/button.scss'
import 'assets/icon/iconfont.scss'
import 'assets/css/meida.scss'
import router from './router'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
