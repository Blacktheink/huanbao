import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../src/assets/reset.css'
import '../src/tool/flexible'
import {lazyLoadingImg} from "@/tool/tool";
lazyLoadingImg().then(()=>console.warn('图片懒加载完毕')).catch(err=>{console.error(`图片懒加载错误：${err}`)})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
