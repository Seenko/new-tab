<template>
  <base-widget>
    <v-clock-widget
      :now="now"
      :show-clock-seconds="settings.showClockSeconds"
      :show-24-hour-clock="settings.show24HourClock"
    />
  </base-widget>
</template>

<script setup lang="ts">
import { useNow } from '@vueuse/core';
import { useSettingsStore } from '@/store/settings';

import BaseWidget from '@/widgets/BaseWidget.vue';
import VClockWidget from '@/components/widgets/VClockWidget.vue';

const settings = useSettingsStore();
const now = useNow();
</script>