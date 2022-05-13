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
</template>

<script setup lang="ts">
import VSettingEntry from '@/components/molecules/VSettingEntry.vue';
import VToggle from '@/components/atoms/VToggle.vue';

interface Props {
  showTopSites: boolean;
  iconsOnly: boolean;
}

withDefaults(defineProps<Props>(), {
  showTopSites: false,
  iconsOnly: false,
});

const emit = defineEmits(['set-setting']);
</script>