import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import 'virtual:windi.css'
import 'inter-ui/inter.css'

const routes = setupLayouts(generatedRoutes)

export const createApp = ViteSSG(App, { routes })
