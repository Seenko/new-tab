<template>
  <base-widget
    :widget="widget"
    :is-editable="isEditable"
  >
    <template #default="slotProps">
      <v-text-widget
        v-bind="slotProps"
      />
    </template>
    <template #settings>
      <v-text-widget-settings
        :tag="(widget.settings!.find(setting => setting.id === 'tag')!.value as unknown as number)"
        :tag-list="(widget.settings!.find(setting => setting.id === 'tag')!.values as unknown as string[])"
        :text-style="(widget.settings!.find(setting => setting.id === 'textStyle')!.value as unknown as number)"
        :text-style-list="(widget.settings!.find(setting => setting.id === 'textStyle')!.values as unknown as string[])"
        :text-string="(widget.settings!.find(setting => setting.id === 'textString')!.value as unknown as string)"
        :text-string-placeholder="(widget.settings!.find(setting => setting.id === 'textString')!.placeholder as unknown as string)"
        @set-setting="emit('set-setting', $event)"
      />
    </template>
  </base-widget>
</template>

<script setup lang="ts">
import type { Widget } from '@/types/widgetsGrid';

import BaseWidget from '@/widgets/BaseWidget.vue';
import VTextWidget from '@/components/widgets/VTextWidget.vue';
import VTextWidgetSettings from '@/components/widgets/settings/VTextWidgetSettings.vue';

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