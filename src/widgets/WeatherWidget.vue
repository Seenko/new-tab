<template>
  <base-widget
    :widget="widget"
    :is-editable="isEditable"
  >
    <template #default="slotProps">
      <v-weather-widget
        v-bind="slotProps"
        :is-loading="weather.isLoading"
        :last-updated="weather.data.lastUpdated"
        :weather="weather.data.weather"
        :can-fetch-weather="weather.getCanFetchWeather"
        :error="weather.error"
        @fetch-weather="doFetchWeather"
      />
    </template>
    <template #settings>
      <v-weather-widget-settings
        :show-current-weather="(widget.settings!.find(setting => setting.id === 'showCurrentWeather')!.value as unknown as boolean)"
        :show-week-forecast="(widget.settings!.find(setting => setting.id === 'showWeekForecast')!.value as unknown as boolean)"
        :temperature-unit="(widget.settings!.find(setting => setting.id === 'temperatureUnit')!.value as unknown as number)"
        :temperature-unit-list="(widget.settings!.find(setting => setting.id === 'temperatureUnit')!.values as unknown as string[])"
        :show-last-updated="(widget.settings!.find(setting => setting.id === 'showLastUpdated')!.value as unknown as boolean)"
        @set-setting="emit('set-setting', $event)"
      />
    </template>
  </base-widget>
</template>

<script setup lang="ts">
import type { Widget } from '@/types/widgetsGrid';
import type { WeatherRequest } from '@/services/weather/types/WeatherRequest';

import { onMounted } from 'vue';

import BaseWidget from '@/widgets/BaseWidget.vue';
import VWeatherWidget from '@/components/widgets/VWeatherWidget.vue';
import VWeatherWidgetSettings from '@/components/widgets/settings/VWeatherWidgetSettings.vue';

import { useWeatherStore } from '@/store/widgets/WeatherWidgetStore';

interface Props {
  widget?: Widget;
  isEditable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  widget: () => ({} as unknown as Widget),
  isEditable: false
});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const weather = useWeatherStore(props.widget.id!)();

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

const emit = defineEmits(['set-setting']);
</script>