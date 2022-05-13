<template>
  <v-setting-entry label-id="showTopSites">
    <template #label>
      Automatic Top Sites
    </template>
    <template #control>
      <v-toggle
        id="showTopSites"
        :toggled="showTopSites"
        @click="emit('set-setting', { id: 'showTopSites', value: !(showTopSites) })"
      />
    </template>
  </v-setting-entry>
  <v-setting-entry label-id="iconsOnly">
    <template #label>
      Show Icons Only
    </template>
    <template #control>
      <v-toggle
        id="iconsOnly"
        :toggled="iconsOnly"
        @click="emit('set-setting', { id: 'iconsOnly', value: !(iconsOnly) })"
      />
    </template>
  </v-setting-entry>
  <v-setting-entry
    v-if="!showTopSites"
    label-id="sitesList"
  >
    <template #label>
      Sites List
    </template>
    <template #control>
      <v-sortable-list
        id="sitesList"
        :model-value="sitesList"
        @update:model-value="emit('update-sites-list', $event)"
      >
        <template #item="{ data }">
          <div class="flex flex-row items-center gap-2">
            <img
              class="w-4 h-4"
              :src="data.icon || getIconURL(data.href)"
              alt=""
            >
            <span>
              {{ data.name }}
            </span>
          </div>
        </template>
      </v-sortable-list>
    </template>
  </v-setting-entry>
</template>

<script setup lang="ts">
import type { QuickAccessEntry } from '@/types/QuickAccessEntry';

import { isRunningAsExtension } from '@/utils/browser';

import VSettingEntry from '@/components/molecules/VSettingEntry.vue';
import VToggle from '@/components/atoms/VToggle.vue';
import VSortableList from '@/components/molecules/VSortableList.vue';

interface Props {
  showTopSites: boolean;
  iconsOnly: boolean;
  sitesList: Array<QuickAccessEntry>;
}

withDefaults(defineProps<Props>(), {
  showTopSites: false,
  iconsOnly: false,
  sitesList: () => ([])
});

const getIconURL = (url: string) => {
  if (isRunningAsExtension) {
    return `chrome://favicon/${new URL(url as string).origin}`;
  } else {
    return `https://www.google.com/s2/favicons?domain=${new URL(url as string).origin}`;
  }
};

const emit = defineEmits(['set-setting', 'update-sites-list']);
</script>