<template>
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

import VSettingEntry from '@/components/molecules/VSettingEntry.vue';
import VToggle from '@/components/atoms/VToggle.vue';
import VSelect from '@/components/atoms/VSelect.vue';

interface Props {
  showCurrentWeather: boolean;
  showWeekForecast: boolean;
  temperatureUnit: number;
  temperatureUnitList: Array<string>;
  showLastUpdated: boolean;
}

withDefaults(defineProps<Props>(), {
  showCurrentWeather: false,
  showWeekForecast: false,
  temperatureUnit: 0,
  temperatureUnitList: () => ([]),
  showLastUpdated: false
});

const emit = defineEmits(['set-setting']);
</script>