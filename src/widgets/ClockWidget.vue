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
    <template #settings>
      <v-clock-widget-settings
        :show24-hour-clock="(widget.settings!.find(setting => setting.id === 'show24HourClock')!.value as unknown as boolean)"
        :show-clock-seconds="(widget.settings!.find(setting => setting.id === 'showClockSeconds')!.value as unknown as boolean)"
        :timezone="(widget.settings!.find(setting => setting.id === 'timezone')!.value as unknown as number)"
        :timezone-list="(widget.settings!.find(setting => setting.id === 'timezone')!.values as unknown as string[])"
        @set-setting="emit('set-setting', $event)"
      />
    </template>
  </base-widget>
</template>

<script setup lang="ts">
import type { Widget } from '@/types/widgetsGrid';

import { useNow } from '@vueuse/core';

import BaseWidget from '@/widgets/BaseWidget.vue';
import VClockWidget from '@/components/widgets/VClockWidget.vue';
import VClockWidgetSettings from '@/components/widgets/settings/VClockWidgetSettings.vue';

const now = useNow();

interface Props {
  widget?: Widget;
  isEditable?: boolean;
}

withDefaults(defineProps<Props>(), {
  widget: () => ({} as unknown as Widget),
  isEditable: false
});

const emit = defineEmits(['set-setting']);
</script>