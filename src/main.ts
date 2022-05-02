import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from '@/router';
import App from '@/App.vue';
import '@/styles/main.scss';

import NewsService from '@/services/news';
import WeatherService from '@/services/weather';
import { useApiKeysStore } from '@/store/apiKeys';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount('#app');

const apiKeys = useApiKeysStore();

NewsService.init(apiKeys.news);
WeatherService.init(apiKeys.weather);