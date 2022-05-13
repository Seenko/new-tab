<template>
  <v-setting-entry label-id="searchTerm">
    <template #label>
      Search Term
    </template>
    <template #control>
      <v-text-input
        :model-value="searchTerm"
        :placeholder="searchTermPlaceholder"
        @update:model-value="emit('set-setting', { id: 'searchTerm', value: $event })"
      />
    </template>
  </v-setting-entry>
</template>

<script setup lang="ts">
import VSettingEntry from '@/components/molecules/VSettingEntry.vue';
import VTextInput from '@/components/atoms/VTextInput.vue';

interface Props {
  searchTerm: string;
  searchTermPlaceholder: string;
}

withDefaults(defineProps<Props>(), {
  searchTerm: '',
  searchTermPlaceholder: ''
});

const emit = defineEmits(['set-setting']);
</script>