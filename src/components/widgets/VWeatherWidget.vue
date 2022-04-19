<template>
  <div class="weather">
    <div class="weather__group">
      <v-spinner-mask
        v-if="isLoading"
        class="weather__spinner"
      />
      <v-weather-day
        v-if="weather?.current"
        class="weather__current"
        temperature_unit="celsius"
        :icon="weather.current.weather[0].icon"
        :temperature="weather.current.temp"
        :forecast="weather.current.weather[0].main"
        :sunrise="weather.current.sunrise"
        :sunset="weather.current.sunset"
      />
      <v-weather-day
        v-for="day in dailyWeatherArray"
        class="weather__daily"
        temperature_unit="celsius"
        :icon="day.weather[0].icon"
        :temperature="day.temp.day"
        :forecast="day.weather[0].main"
        :date="day.dt * 1000"
        :sunrise="day.sunrise"
        :sunset="day.sunset"
      />
    </div>
    <div class="weather__actions">
      <v-button
        v-if="canFetchWeather"
        class="action action--fetch"
        aria-label="Fetch Weather"
        variant="icon"
        @click="$emit('fetch-weather')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.5 2c-5.629 0-10.212 4.436-10.475 10h-3.025l4.537 5.917 4.463-5.917h-2.975c.26-3.902 3.508-7 7.475-7 4.136 0 7.5 3.364 7.5 7.5s-3.364 7.5-7.5 7.5c-2.381 0-4.502-1.119-5.876-2.854l-1.847 2.449c1.919 2.088 4.664 3.405 7.723 3.405 5.798 0 10.5-4.702 10.5-10.5s-4.702-10.5-10.5-10.5z"/></svg>
      </v-button>
    </div>
    <div class="weather__status">
      <small class="weather__lastUpdated">
        last updated {{ weatherLastUpdated }}
      </small>
    </div>
    <p
      v-if="error"
      class="weather__error"
    >
      An error happened whilst trying to fetch the weather, please try again later.
    </p>
  </div>
</template>

<script setup lang="ts">
import type { WeatherResponse } from '@/services/weather/types/WeatherResponse'
import { PropType, computed } from 'vue'
import { useTimeAgo, breakpointsTailwind, useBreakpoints } from '@vueuse/core'

import VButton from '@/components/atoms/VButton.vue'
import VSpinnerMask from '@/components/molecules/VSpinnerMask.vue'
import VWeatherDay from '@/components/molecules/VWeatherDay.vue'

const props = defineProps({
  isLoading: Boolean,
  lastUpdated: Number,
  weather: Object as PropType<WeatherResponse>,
  canFetchWeather: Boolean,
  error: Error
})

const weatherLastUpdated = computed(() => {
  return useTimeAgo(new Date(props.lastUpdated!)).value
})

const breakpoints = useBreakpoints(breakpointsTailwind)

const dailyWeatherArray = computed(() => {
  if (!props.weather || !props.weather.daily) return []

  if (breakpoints.md.value) {
    return props.weather.daily
  } else {
    return props.weather.daily.slice(0, 3)
  }
})
</script>

<style lang="scss" scoped>
.weather {
  @apply flex flex-col gap-2 max-w-2xl;

  &__group {
    @apply flex flex-row relative gap-5;
  }

  &__spinner {
    @apply rounded-lg;
  }

  &__status {
    @apply text-center text-gray-600;
  }

  &__actions {
    @apply flex flex-row justify-end gap-2;

    .action svg {
      @apply h-4;
    }
  }

  &__error {
    @apply text-center;
  }
}
</style>