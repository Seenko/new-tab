<template>
  <base-widget
    :widget="widget"
    :is-editable="isEditable"
  >
    <template #default="slotProps">
      <v-quick-access-widget
        v-bind="slotProps"
        :entries="quickAccessEntries"
      />
    </template>
  </base-widget>
</template>

<script setup lang="ts">
import type { Widget } from '@/types/widgetsGrid';
import type { quickAccessEntry } from '@/types/quickAccessEntry';

import { ref, computed, onMounted } from 'vue';
import { useQuickAccessStore } from '@/store/quickAccess';
import { getBrowserInstance, isRunningAsExtension } from '@/utils/browser';

import BaseWidget from '@/widgets/BaseWidget.vue';
import VQuickAccessWidget from '@/components/widgets/VQuickAccessWidget.vue';

const quickAccess = useQuickAccessStore();

interface Props {
  widget?: Widget;
  isEditable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  widget: () => ({} as unknown as Widget),
  isEditable: false
});

const widgetSettings = computed(() => {
  let settings: { [id: string]: unknown } = {};

  if (props.widget && props.widget.settings) {
    props.widget.settings.forEach(setting => {
      settings[setting.id] = setting.value;
    });
  }

  return settings;
});

const topSitesArray = ref<quickAccessEntry[]>();

const quickAccessEntries = computed(() => {
  if (isRunningAsExtension && widgetSettings.value.showTopSites) {
    return topSitesArray.value;
  }
  
  return quickAccess.getQuickAccessEntries;
});

onMounted(() => {
  const topSites = getBrowserInstance().topSites;

  if (topSites) {
    topSites.get((topSites) => {
      topSitesArray.value = topSites.map((topSite): quickAccessEntry => {
        return {
          name: topSite.title,
          href: topSite.url
        };
      }).slice(0, 5);
    });
  }
});
</script>