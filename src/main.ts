import { createApp } from 'vue'
import { registerSW } from 'virtual:pwa-register'
import App from './App.vue'
import 'virtual:windi.css'

registerSW({ immediate: true })
createApp(App).mount('#app')
