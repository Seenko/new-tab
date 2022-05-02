<template>
  <base-widget>
    <template #default="slotProps">
      <v-clock-widget
        v-bind="slotProps"
        :now="now"
      />
    </template>
  </base-widget>
</template>

<script setup lang="ts">
import { useNow } from '@vueuse/core';

import BaseWidget from '@/widgets/BaseWidget.vue';
import VClockWidget from '@/components/widgets/VClockWidget.vue';

const now = useNow();
</script>