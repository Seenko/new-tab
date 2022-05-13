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
    <template #settings>
      <v-image-widget-settings
        :src="(widget.settings!.find(setting => setting.id === 'src')!.value as unknown as string)"
        :src-placeholder="(widget.settings!.find(setting => setting.id === 'src')!.placeholder as unknown as string)"
        @set-setting="emit('set-setting', $event)"
      />
    </template>
  </base-widget>
</template>

<script setup lang="ts">
import type { Widget } from '@/types/widgetsGrid';

import BaseWidget from '@/widgets/BaseWidget.vue';
import VImageWidget from '@/components/widgets/VImageWidget.vue';
import VImageWidgetSettings from '@/components/widgets/settings/VImageWidgetSettings.vue';

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