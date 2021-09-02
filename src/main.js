import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/base.css'
import './assets/css/ionfont.css'
import i18n from './lang';
import api from './api';
Vue.config.productionTip = false
Vue.prototype.$api = api;

//刷新获取本地的存储
let userinfo = localStorage.getItem('userinfo')
if(userinfo){
  let obj = JSON.parse(userinfo);
  store.commit('loginModule/setUser',obj);
}
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
