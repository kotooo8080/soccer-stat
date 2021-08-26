import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import '@/assets/styles/style.scss'

createApp(App).use(router).mount('#app')
