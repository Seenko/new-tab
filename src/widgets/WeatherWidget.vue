<template>
  <base-widget
    :widget="widget"
    :is-editable="isEditable"
  >
    <v-weather-widget
      :is-loading="weather.isLoading"
      :last-updated="weather.data.lastUpdated"
      :weather="weather.data.weather"
      :can-fetch-weather="weather.getCanFetchWeather"
      :error="weather.error"
      @fetch-weather="doFetchWeather"
    />
  </base-widget>
</template>

<script setup lang="ts">
import type { Widget } from '@/types/widgetsGrid';
import type { WeatherRequest } from '@/services/weather/types/WeatherRequest';

import { onMounted } from 'vue';

import BaseWidget from '@/widgets/BaseWidget.vue';
import VWeatherWidget from '@/components/widgets/VWeatherWidget.vue';

import { useWeatherStore } from '@/store/weather';

const weather = useWeatherStore();

interface Props {
  widget?: Widget;
  isEditable?: boolean;
}

withDefaults(defineProps<Props>(), {
  widget: () => ({} as unknown as Widget),
  isEditable: false
});

const doFetchWeather = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    weather.loadWeather({
      lat: position.coords.latitude,
      lon: position.coords.longitude
    } as WeatherRequest);
  });
};

onMounted(() => {
  if (weather.getCanFetchWeather) {
    doFetchWeather();
  }
});
</script>