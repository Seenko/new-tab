import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

interface ApiKeys {
  news: string;
  weather: string;
  location: string;
}

const defaultApiKeys: ApiKeys = {
  news: '',
  weather: '',
  location: ''
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
    },
    setLocationApiKey(value: string): string {
      return (this.location = value);
    }
  },
});