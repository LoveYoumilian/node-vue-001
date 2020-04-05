import Vue from 'vue'
import App from './App'
import router from './Router/index'

Vue.config.productionTip = false


import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)


import './assets/scss/style.scss'
import './assets/iconfont/iconfont.css'

import Card from './components/Card.vue'
Vue.component('m-card', Card)

import ListCard from './components/ListCard.vue'
Vue.component('m-list-card', ListCard)

import axios from 'axios'
Vue.prototype.$http = axios.create({
    // baseURL: process.env.VUE_APP_API_URL || '/web/api'
    baseURL: 'http://localhost:3000/web/api'
})


new Vue({
    router,
    render: h => h(App),
}).$mount('#app')