import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

interface ApiKeys {
  news: string;
  weather: string;
}

const defaultApiKeys: ApiKeys = {
  news: '',
  weather: ''
};

export const useApiKeysStore = defineStore({
  id: 'apiKeys',
  state: () => useStorage('apiKeys', defaultApiKeys),
  actions: {
    setNewsApiKey(value: string): string {
      return (this.news = value);
    },
    setWeatherApiKey(value: string): string {
      return (this.weather = value);
    }
  },
});