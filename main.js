import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// Vue.prototype.serverUrl = "https://www.yilaiyiwang.com" //生产环境
// Vue.prototype.serverUrl = "http://www.yilaiyiwang.com:8090" //测试环境
Vue.prototype.serverUrl = "http://120.78.76.72" //测试环境
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
