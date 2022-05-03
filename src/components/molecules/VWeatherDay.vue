<template>
  <div class="weather">
    <img
      class="weather__icon"
      :src="iconImagePath"
      alt=""
    >
    <div class="weather__temperature">
      {{ displayTemperatue }}
    </div>
    <div class="weather__forecast">
      {{ forecast }}
    </div>
    <div v-if="date || slots.date">
      <hr class="mb-2">
      <div
        class="weather__date"
      >
        <slot name="date" />
        <span v-if="!slots.date">{{ dateDay }}</span>
      </div>
    </div>
    <!-- <p>Sunrise: {{ sunrise }}</p>
    <p>Sunset: {{ sunset }}</p> -->
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { kelvinToCelsius, kelvinToFahrenheit } from '@/utils/weather';

interface Props {
  icon: string,
  temperature: number,
  forecast: string,
  date?: Date | number,
  sunrise: Date | number,
  sunset: Date | number,
  temperatureUnit: 'kelvin' | 'celsius' | 'fahrenheit'
}

const props = withDefaults(defineProps<Props>(), {
  icon: '',
  temperature: 0,
  forecast: 'String',
  date: 0,
  sunrise: 0,
  sunset: 0,
  temperatureUnit: 'kelvin'
});

const slots = useSlots();

const iconImagePath = computed(() => {
  return `/assets/weather/iconsv2/${props.icon}.svg`;
});

const displayTemperatue = computed(() => {
  switch (props.temperatureUnit) {
    case 'kelvin':
      return `${Math.round(props.temperature)} K`;
    case 'celsius':
      return `${Math.round(kelvinToCelsius(props.temperature))} °C`;
    case 'fahrenheit':
      return `${Math.round(kelvinToFahrenheit(props.temperature))} °F`;
    default:
      return '';
  }
});

const dateDay = computed(() => {
  let options: Intl.DateTimeFormatOptions = {
    // dateStyle: 'short',
    weekday: 'short'
  };

  return new Date(props.date).toLocaleString(undefined, options);
});
</script>

<style lang="scss" scoped>
.weather {
  @apply grid gap-2 justify-center text-center;

  &__icon {
    @apply w-full;
  }
}
</style>