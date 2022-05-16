<template>
  <v-setting-entry
    label-id="weatherLocation"
    is-stacked
  >
    <template #label>
      Location
    </template>
    <template #control>
      <div
        ref="weatherLocationSection"
        class="weatherLocation"
      >
        <div class="weatherLocation__inputs">
          <v-text-input
            v-model.trim="weatherLocationModel"
            placeholder="City, State, Country"
          />
          <v-button
            variant="icon"
            @click="emit('select-location', null)"
          >
            <LocationIcon />
          </v-button>
        </div>
        <div
          v-if="showWeatherLocationSuggestions"
          class="weatherLocation__suggestions"
        >
          <v-location-suggestion
            v-for="(suggestion, index) in weatherLocationSuggestions"
            :key="index"
            :name="suggestion.address?.name"
            :city="suggestion.address?.city"
            :state="suggestion.address?.state"
            :country="suggestion.address?.country"
            @click="emit('select-location', suggestion)"
          />
        </div>
      </div>
    </template>
  </v-setting-entry>
  <v-setting-entry label-id="showCurrentWeather">
    <template #label>
      Current Weather
    </template>
    <template #control>
      <v-toggle
        id="showCurrentWeather"
        :toggled="showCurrentWeather"
        @click="emit('set-setting', { id: 'showCurrentWeather', value: !(showCurrentWeather) })"
      />
    </template>
  </v-setting-entry>
  <v-setting-entry label-id="showWeekForecast">
    <template #label>
      Week Forecast
    </template>
    <template #control>
      <v-toggle
        id="showWeekForecast"
        :toggled="showWeekForecast"
        @click="emit('set-setting', { id: 'showWeekForecast', value: !(showWeekForecast) })"
      />
    </template>
  </v-setting-entry>
  <v-setting-entry label-id="temperatureUnit">
    <template #label>
      Temperature Unit
    </template>
    <template #control>
      <v-select
        :options="temperatureUnitList"
        :model-value="temperatureUnit"
        @update:model-value="emit('set-setting', { id: 'temperatureUnit', value: $event })"
      >
        <template #option="{ data }">
          {{ (data as WigetSettingValue).name }}
        </template>
      </v-select>
    </template>
  </v-setting-entry>
  <v-setting-entry label-id="showLastUpdated">
    <template #label>
      Show "Last Updated" Message
    </template>
    <template #control>
      <v-toggle
        id="showLastUpdated"
        :toggled="showLastUpdated"
        @click="emit('set-setting', { id: 'showLastUpdated', value: !(showLastUpdated) })"
      />
    </template>
  </v-setting-entry>
</template>

<script setup lang="ts">
import type { WigetSettingValue } from '@/types/widgetsGrid';
import type { LocationSearchResponse } from '@/services/location/types/LocationSearchResponse';

import { ref, computed } from 'vue';
import { useFocusWithin } from '@vueuse/core';
import { useElementHover } from '@vueuse/core';

import VSettingEntry from '@/components/molecules/VSettingEntry.vue';
import VTextInput from '@/components/atoms/VTextInput.vue';
import VButton from '@/components/atoms/VButton.vue';
import VToggle from '@/components/atoms/VToggle.vue';
import VSelect from '@/components/atoms/VSelect.vue';
import VLocationSuggestion from '@/components/atoms/VLocationSuggestion.vue';

import LocationIcon from '@/assets/icons/location.svg';

interface Props {
  weatherLocation?: string;
  weatherLocationSuggestions?: LocationSearchResponse;
  showCurrentWeather: boolean;
  showWeekForecast: boolean;
  temperatureUnit: number;
  temperatureUnitList: Array<string>;
  showLastUpdated: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  weatherLocation: '',
  weatherLocationSuggestions: () => ([]),
  showCurrentWeather: false,
  showWeekForecast: false,
  temperatureUnit: 0,
  temperatureUnitList: () => ([]),
  showLastUpdated: false
});

const weatherLocationModel = computed({
  get: () => props.weatherLocation, 
  set: (value) => emit('update:weatherLocation', value)
});

const weatherLocationSection = ref();
const { focused: weatherLocationSectionFocused } = useFocusWithin(weatherLocationSection);
const isOverWeatherLocationSection = useElementHover(weatherLocationSection);

const showWeatherLocationSuggestions = computed(() => {
  return (isOverWeatherLocationSection.value || weatherLocationSectionFocused.value) && props.weatherLocationSuggestions.length > 0;
});

const emit = defineEmits(['set-setting', 'update:weatherLocation', 'select-location']);
</script>

<style lang="scss" scoped>
.weatherLocation {
  @apply relative flex flex-col gap-2;

  &__inputs {
    @apply flex flex-row gap-2;
  }

  &__suggestions {
    @apply absolute top-12 left-0 right-0 z-50;
    @apply flex flex-col gap-2;
    @apply max-h-32 p-2 rounded overflow-auto;
    @apply bg-gray-100 dark:bg-gray-800;
    @apply drop-shadow dark:drop-shadow-none;
  }
}
</style>