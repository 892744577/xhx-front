import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
//import Antd from 'ant-design-vue';
import 'amfe-flexible/index.js'

// 全局css
import './assets/style/scoped.css';

// Vant-ui
import Vant from 'vant';
import 'vant/lib/index.css';
//import 'ant-design-vue/dist/antd.css';
Vue.use(Vant);
//Vue.use(Antd);

import '@/icons' // icon
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')