import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { bootLocale } from './lib/locale'
import { bootTelegram } from './lib/telegram'
import './style.css'

bootTelegram()
bootLocale()

createApp(App).use(router).mount('#app')
