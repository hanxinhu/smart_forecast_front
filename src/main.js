// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
import { FormModel } from 'ant-design-vue';
Vue.use(Antd)
Vue.use(FormModel)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://106.15.236.153'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
