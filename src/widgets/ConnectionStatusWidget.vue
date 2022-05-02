<template>
  <base-widget>
    <template #default="slotProps">
      <v-connection-status-widget
        v-bind="slotProps"
        :is-online="isOnline"
      />
    </template>
  </base-widget>
</template>

<script setup lang="ts">
import { useOnline } from '@vueuse/core';

import BaseWidget from '@/widgets/BaseWidget.vue';
import VConnectionStatusWidget from '@/components/widgets/VConnectionStatusWidget.vue';

const isOnline = useOnline();
</script>