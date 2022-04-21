<template>
  <widget v-show="settings.getShowWeather">
    <v-weather-widget
      :is-loading="weather.isLoading"
      :last-updated="weather.data.lastUpdated"
      :weather="weather.data.weather"
      :can-fetch-weather="weather.getCanFetchWeather"
      :error="weather.error"
      @fetch-weather="doFetchWeather"
    />
  </widget>
</template>

<script setup lang="ts">
import type { WeatherRequest } from '@/services/weather/types/WeatherRequest'

import { onMounted } from 'vue'

import Widget from '@/widgets/Widget.vue'
import VWeatherWidget from '@/components/widgets/VWeatherWidget.vue'

import { useWeatherStore } from '@/store/weather'
import { useSettingsStore } from '@/store/settings'

const weather = useWeatherStore()
const settings = useSettingsStore()

const doFetchWeather = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    weather.loadWeather({
      lat: position.coords.latitude,
      lon: position.coords.longitude
    } as WeatherRequest)
  });
}

onMounted(() => {
  if (weather.getCanFetchWeather) {
    doFetchWeather()
  }
})
</script>