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
        v-for="(day, index) in dailyWeatherArray"
        :key="index"
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
        @click="emit('fetch-weather')"
      >
        <ReloadIcon />
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

import { computed } from 'vue'
import { useTimeAgo, breakpointsTailwind, useBreakpoints } from '@vueuse/core'

import VButton from '@/components/atoms/VButton.vue'
import VSpinnerMask from '@/components/molecules/VSpinnerMask.vue'
import VWeatherDay from '@/components/molecules/VWeatherDay.vue'

import ReloadIcon from '@/assets/icons/reload.svg'

interface Props {
  isLoading: boolean,
  lastUpdated: number,
  weather: WeatherResponse | null,
  canFetchWeather: boolean,
  error: Error | null
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: true,
  lastUpdated: 0,
  weather: null,
  canFetchWeather: true,
  error: null
})

const weatherLastUpdated = computed(() => {
  return useTimeAgo(new Date(props.lastUpdated)).value
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

const emit = defineEmits(['fetch-weather'])
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