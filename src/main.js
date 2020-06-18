import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts



Vue.prototype.$axios = axios
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  icons: {
      iconfont: 'mdi', // default - only for display purposes
    },
	
	
  render: h => h(App)
  
}).$mount('#app')
