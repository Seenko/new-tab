<template>
  <div class="weather">
    <p class="weather__temperature">
      {{ displayTemperatue }}
    </p>
    <img
      class="weather__icon"
      :src="iconImagePath"
      alt=""
    />
    <p class="weather__forecast">
      {{ forecast }}
    </p>
    <div v-if="date">
      <hr class="mb-2" />
      <p
        class="weather__date"
      >
        {{ dateDay }}
      </p>
    </div>
    <!-- <p>Sunrise: {{ sunrise }}</p>
    <p>Sunset: {{ sunset }}</p> -->
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { kelvinToCelsius, kelvinToFahrenheit } from '@/utils/weather'

interface Props {
  icon: string,
  temperature: number,
  forecast: string,
  date?: Date | number,
  sunrise: Date | number,
  sunset: Date | number,
  temperature_unit: 'kelvin' | 'celsius' | 'fahrenheit'
}

const props = withDefaults(defineProps<Props>(), {
  icon: '',
  temperature: 0,
  forecast: 'String',
  date: 0,
  sunrise: 0,
  sunset: 0,
  temperature_unit: 'kelvin'
})

const iconImagePath = computed(() => {
  return `/assets/weather/icons/${props.icon}.png`
})

const displayTemperatue = computed(() => {
  switch (props.temperature_unit) {
    case 'kelvin':
      return Math.round(props.temperature)
    case 'celsius':
      return `${Math.round(kelvinToCelsius(props.temperature))} °C`
    case 'fahrenheit':
      return `${Math.round(kelvinToFahrenheit(props.temperature))} °F`
  }
})

const dateDay = computed(() => {
  let options: Intl.DateTimeFormatOptions = {
    // dateStyle: 'short',
    weekday: 'short'
  }

  return new Date(props.date).toLocaleString(undefined, options)
})
</script>

<style lang="scss" scoped>
.weather {
  @apply flex flex-col justify-center items-center;

  &__icon {
    @apply w-12 h-12;
  }
}
</style>