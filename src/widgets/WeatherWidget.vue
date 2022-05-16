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
        :weather-location="(widget.settings!.find(setting => setting.id === 'locationName')!.value as unknown as string)"
        :weather-location-suggestions="weatherLocationSuggestions"
        :show-current-weather="(widget.settings!.find(setting => setting.id === 'showCurrentWeather')!.value as unknown as boolean)"
        :show-week-forecast="(widget.settings!.find(setting => setting.id === 'showWeekForecast')!.value as unknown as boolean)"
        :temperature-unit="(widget.settings!.find(setting => setting.id === 'temperatureUnit')!.value as unknown as number)"
        :temperature-unit-list="(widget.settings!.find(setting => setting.id === 'temperatureUnit')!.values as unknown as string[])"
        :show-last-updated="(widget.settings!.find(setting => setting.id === 'showLastUpdated')!.value as unknown as boolean)"
        @set-setting="emit('set-setting', $event)"
        @update:weather-location="onUpdateWeatherLocation($event)"
        @select-location="onSelectLocation($event)"
      />
    </template>
  </base-widget>
</template>

<script setup lang="ts">
import type { Widget } from '@/types/widgetsGrid';
import type { WeatherRequest } from '@/services/weather/types/WeatherRequest';
import type { LocationSearchResponse } from '@/services/location/types/LocationSearchResponse';
import type { Location } from '@/services/location/types/Location';

import { ref, onMounted } from 'vue';
import debounce from 'lodash/debounce';

import LocationService from '@/services/location';

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

const doFetchWeather = async (lat?: number, lon?: number) => {
  if (!lat || !lon) {
    await navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      lat = latitude;
      lon = longitude;
      await weather.loadWeather({ lat, lon } as WeatherRequest);
    });
  } else {
    await weather.loadWeather({ lat, lon } as WeatherRequest);
  }
};

const weatherLocationSuggestions = ref<LocationSearchResponse>();

const onUpdateWeatherLocationCancelToken = ref<AbortController>();
const onUpdateWeatherLocation = debounce(async (query: string) => {
  if (!query) return;

  if (onUpdateWeatherLocationCancelToken.value) {
    onUpdateWeatherLocationCancelToken.value.abort();
  }

  onUpdateWeatherLocationCancelToken.value = new AbortController();
  await LocationService.getAutocomplete({
    q: query,
    normalizecity: true,
    tag: ['place:*'],
    limit: 3
  }, onUpdateWeatherLocationCancelToken.value).then(response => {
    if (response && response.length > 0) {
      weatherLocationSuggestions.value = response;
    }
  });
}, 200);

const onSelectLocation = (location: Location) => {
  if (location) {
    emit('set-setting', { id: 'locationName', value: location.address?.name });
    emit('set-setting', { id: 'latitude', value: location.lat });
    emit('set-setting', { id: 'longitude', value: location.lon });
    doFetchWeather(location.lat, location.lon);
  } else {
    emit('set-setting', { id: 'locationName', value: '' });
    emit('set-setting', { id: 'latitude', value: null });
    emit('set-setting', { id: 'longitude', value: null });
    doFetchWeather();
  }

  weatherLocationSuggestions.value = [];
};

onMounted(() => {
  if (weather.getCanFetchWeather) {
    const latitude = (props.widget.settings?.find(setting => setting.id === 'latitude')?.value as unknown as number);
    const longitude = (props.widget.settings?.find(setting => setting.id === 'longitude')?.value as unknown as number);
    doFetchWeather(latitude, longitude);
  }
});

const emit = defineEmits(['set-setting']);
</script>