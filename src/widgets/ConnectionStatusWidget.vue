<template>
  <base-widget
    :widget="widget"
    :is-editable="isEditable"
  >
    <template #default="slotProps">
      <v-connection-status-widget
        v-bind="slotProps"
        :is-online="isOnline"
      />
    </template>
  </base-widget>
</template>

<script setup lang="ts">
import type { Widget } from '@/types/widgetsGrid';

import { useOnline } from '@vueuse/core';

import BaseWidget from '@/widgets/BaseWidget.vue';
import VConnectionStatusWidget from '@/components/widgets/VConnectionStatusWidget.vue';

const isOnline = useOnline();

interface Props {
  widget?: Widget;
  isEditable?: boolean;
}

withDefaults(defineProps<Props>(), {
  widget: () => ({} as unknown as Widget),
  isEditable: false
});
</script>