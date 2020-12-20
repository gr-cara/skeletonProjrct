// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false
import '@/assets/iconfont/iconfont.css'
//mint ui
import Mint from 'mint-ui'
import'mint-ui/lib/style.css'
Vue.use(Mint);
import '@/assets/css/reset.css'
import '@/assets/css/common.css'
//url
import URL from "./assets/js/url";
Vue.prototype.URL=URL;
import SUCCESS from "./assets/js/success";
Vue.prototype.SUCCESS=SUCCESS;
/**图表 */
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import axios from '../src/assets/js/http'
Vue.prototype.axios = axios;



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
