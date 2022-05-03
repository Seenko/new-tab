<template>
  <base-widget
    :widget="widget"
    :is-editable="isEditable"
  >
    <template #default="slotProps">
      <v-clock-widget
        v-bind="slotProps"
        :now="now"
      />
    </template>
  </base-widget>
</template>

<script setup lang="ts">
import type { Widget } from '@/types/widgetsGrid';

import { useNow } from '@vueuse/core';

import BaseWidget from '@/widgets/BaseWidget.vue';
import VClockWidget from '@/components/widgets/VClockWidget.vue';

const now = useNow();

interface Props {
  widget?: Widget;
  isEditable?: boolean;
}

withDefaults(defineProps<Props>(), {
  widget: () => ({} as unknown as Widget),
  isEditable: false
});
</script>