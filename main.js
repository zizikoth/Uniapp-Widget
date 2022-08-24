import App from './App'
import Vue from 'vue'

var oldTime = 0
Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.debounce = function(func) {
    let newTime = new Date().getTime()
    if (newTime - oldTime > 1000) {
        oldTime = newTime
        if (func) func()
    } else {
        oldTime = newTime
        console.warn("拦截重复点击")
    }
}

const app = new Vue({
    ...App
})

app.$mount()
