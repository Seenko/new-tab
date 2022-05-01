import type { WeatherRequest } from '@/services/weather/types/WeatherRequest';
import type { WeatherResponse } from '@/services/weather/types/WeatherResponse';

import { defineStore } from 'pinia';
import { useStorage, useNow, useOnline } from '@vueuse/core';

import WeatherService from '@/services/weather';

interface Weather {
  weather: WeatherResponse | undefined;
  lastUpdated: number;
}

const defaultWeather: Weather = {
  weather: undefined,
  lastUpdated: 0
};

export const useWeatherStore = defineStore({
  id: 'weather',
  state: () => ({
    data: useStorage('weather', defaultWeather),
    isLoading: false,
    error: undefined as Error | undefined
  }),
  getters: {
    getCanFetchWeather(state) {
      const now = useNow();
      const isOnline = useOnline();

      return isOnline.value && (now.value.getTime() > (state.data.lastUpdated || 0) + (60 * 60 * 1000));
    }
  },
  actions: {
    async loadWeather(weatherRequest: WeatherRequest) {
      if (!this.getCanFetchWeather) return;

      this.data.lastUpdated = new Date().getTime();
      this.isLoading = true;
      this.error = undefined;

      try {
        const weatherResponse = await WeatherService.getWeather(weatherRequest);

        if (weatherResponse) {
          this.data.weather = weatherResponse;
        }
      } catch (error) {
        this.error = error as Error;
        this.isLoading = false;
        throw error;
      }

      this.isLoading = false;
    }
  },
});