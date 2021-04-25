import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'layouts-generated'
import generatedRoutes from 'pages-generated'
import { registerSW } from 'virtual:pwa-register'
import App from './App.vue'
import 'virtual:windi.css'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

registerSW({ immediate: true })

const app = createApp(App)
app.use(router)
app.mount('#app')
