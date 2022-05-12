<template>
  <base-widget
    :widget="widget"
    :is-editable="isEditable"
  >
    <template #default="slotProps">
      <v-image-widget
        v-bind="slotProps"
      />
    </template>
  </base-widget>
</template>

<script setup lang="ts">
import type { Widget } from '@/types/widgetsGrid';


import BaseWidget from '@/widgets/BaseWidget.vue';
import VImageWidget from '@/components/widgets/VImageWidget.vue';

interface Props {
  widget?: Widget;
  isEditable?: boolean;
}

withDefaults(defineProps<Props>(), {
  widget: () => ({} as unknown as Widget),
  isEditable: false
});
</script>