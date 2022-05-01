<template>
  <base-widget>
    <v-quick-access-widget
      :entries="quickAccessEntries"
    />
  </base-widget>
</template>

<script setup lang="ts">
import type { quickAccessEntry } from '@/types/quickAccessEntry';

import { ref, computed, onMounted } from 'vue';
import { useQuickAccessStore } from '@/store/quickAccess';
import { useSettingsStore } from '@/store/settings';
import { getBrowserInstance, isRunningAsExtension } from '@/utils/browser';

import BaseWidget from '@/widgets/BaseWidget.vue';
import VQuickAccessWidget from '@/components/widgets/VQuickAccessWidget.vue';

const quickAccess = useQuickAccessStore();
const settings = useSettingsStore();

const topSitesArray = ref<quickAccessEntry[]>();

const quickAccessEntries = computed(() => {
  if (settings.getAutoQuickAccessEntries) {
    if (isRunningAsExtension) {
      return (topSitesArray.value && topSitesArray.value.length) ? topSitesArray.value : [];
    }

    // When not running as an extension, we can't get the top sites from the browser instance
    return [];
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