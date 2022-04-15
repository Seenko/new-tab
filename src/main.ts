import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from '@/router'
import App from '@/App.vue'
import '@/styles/main.scss'

import NewsService from '@/services/news'
import { useSettingsStore } from '@/store/settings'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')

const settings = useSettingsStore()

NewsService.init(settings.newsApiKey)