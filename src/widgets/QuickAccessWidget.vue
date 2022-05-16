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
    <template #settings>
      <v-quick-access-widget-settings
        :show-top-sites="(widget.settings!.find(setting => setting.id === 'showTopSites')!.value as unknown as boolean)"
        :icons-only="(widget.settings!.find(setting => setting.id === 'iconsOnly')!.value as unknown as boolean)"
        :sites-list="quickAccessEntries"
        @set-setting="emit('set-setting', $event)"
        @update-sites-list="onUpdateSitesList($event)"
        @add-site="onAddSite($event)"
        @update-site="onUpdateSite($event)"
        @remove-site="onRemoveSite($event)"
      />
    </template>
  </base-widget>
</template>

<script setup lang="ts">
import type { Widget } from '@/types/widgetsGrid';
import type { QuickAccessEntry } from '@/types/QuickAccessEntry';

import { ref, computed, onMounted } from 'vue';
import { getBrowserInstance, isRunningAsExtension } from '@/utils/browser';
import { v4 as uuid } from 'uuid';

import { useQuickAccessStore } from '@/store/widgets/QuickAccessWidgetStore';

import BaseWidget from '@/widgets/BaseWidget.vue';
import VQuickAccessWidget from '@/components/widgets/VQuickAccessWidget.vue';
import VQuickAccessWidgetSettings from '@/components/widgets/settings/VQuickAccessWidgetSettings.vue';

interface Props {
  widget?: Widget;
  isEditable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  widget: () => ({} as unknown as Widget),
  isEditable: false
});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const quickAccess = useQuickAccessStore(props.widget.id!)();

const widgetSettings = computed(() => {
  let settings: { [id: string]: unknown } = {};

  if (props.widget && props.widget.settings) {
    props.widget.settings.forEach(setting => {
      settings[setting.id] = setting.value;
    });
  }

  return settings;
});

const topSitesArray = ref<QuickAccessEntry[]>();

const quickAccessEntries = computed(() => {
  if (isRunningAsExtension && widgetSettings.value.showTopSites) {
    return topSitesArray.value;
  }
  
  return quickAccess.getQuickAccessEntries;
});

const onUpdateSitesList = (newList: Array<QuickAccessEntry>) => {
  quickAccess.setQuickAccessEntries(newList);
};

const onAddSite = (newSite: string) => {
  quickAccess.addQuickAccessEntry({
    id: uuid(),
    href: newSite
  });
};

const onUpdateSite = (entry: QuickAccessEntry) => {
  quickAccess.updateQuickAccessEntry(entry);
};

const onRemoveSite = (entry: QuickAccessEntry) => {
  quickAccess.removeQuickAccessEntry(entry);
};

onMounted(() => {
  const topSites = getBrowserInstance().topSites;

  if (topSites) {
    topSites.get((topSites) => {
      topSitesArray.value = topSites.map((topSite): QuickAccessEntry => {
        return {
          name: topSite.title,
          href: topSite.url
        };
      }).slice(0, 5);
    });
  }
});

const emit = defineEmits(['set-setting']);
</script>