<template>
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
  <v-setting-entry
    v-if="!showTopSites"
    label-id="sitesList"
    is-stacked
  >
    <template #label>
      Sites List
    </template>
    <template #control>
      <v-sortable-list
        id="sitesList"
        class="sortableSites"
        item-key="id"
        :model-value="sitesList"
        @update:model-value="emit('update-sites-list', $event)"
      >
        <template #empty>
          <div class="sortableSites__empty">
            Add some websites, will 'ya?
          </div>
        </template>
        <template #item="{ data }">
          <v-site-input
            is-removable
            :model-value="data"
            @update:model-value="emit('update-site', $event)"
            @remove="emit('remove-site', $event)"
          />
        </template>
      </v-sortable-list>
      <div class="newSite">
        <form
          class="flex"
          @submit.prevent="addSite()"
        >
          <v-text-input
            v-model="newSite"
            :class="['newSite__input', { 'newSite__input--invalid': newSite && !newSiteIsValidURL }]"
            placeholder="https://example.com"
          />
          <v-button
            variant="icon"
            type="submit"
            :disabled="!newSiteIsValidURL"
          >
            <AddIcon />
          </v-button>
        </form>
      </div>
    </template>
  </v-setting-entry>
</template>

<script setup lang="ts">
import type { QuickAccessEntry } from '@/types/QuickAccessEntry';

import { ref, computed } from 'vue';

import VSettingEntry from '@/components/molecules/VSettingEntry.vue';
import VButton from '@/components/atoms/VButton.vue';
import VToggle from '@/components/atoms/VToggle.vue';
import VTextInput from '@/components/atoms/VTextInput.vue';
import VSiteInput from '@/components/molecules/VSiteInput.vue';
import VSortableList from '@/components/molecules/VSortableList.vue';

import AddIcon from '@/assets/icons/add.svg';

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

const newSiteIsValidURL = computed(() => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    new URL(newSite.value!);
    return true;
  } catch (e) {
    return false;
  }
});

const newSite = ref<string>();

const addSite = () => {
  if (newSiteIsValidURL.value) {
    emit('add-site', newSite.value);
    newSite.value = '';
  }
};

const emit = defineEmits([
  'set-setting',
  'update-sites-list',
  'add-site',
  'update-site',
  'remove-site'
]);
</script>

<style lang="scss" scoped>
.sortableSites {
  @apply p-4 rounded;
  @apply border border-gray-300 dark:border-gray-700;
  @apply bg-gray-200 dark:bg-gray-900;

  &__empty {
    @apply flex flex-col items-center justify-center;
    @apply text-gray-600 dark:text-gray-400;
  }
}

.newSite {
  &__input {
    &--invalid {
      @apply border-red-600 outline-red-600;
    }
  }
}
</style>