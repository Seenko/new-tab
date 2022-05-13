<template>
  <v-setting-entry label-id="src">
    <template #label>
      Image URL
    </template>
    <template #control>
      <v-text-input
        :model-value="src"
        :placeholder="srcPlaceholder"
        @update:model-value="emit('set-setting', { id: 'src', value: $event })"
      />
    </template>
  </v-setting-entry>
</template>

<script setup lang="ts">
import VSettingEntry from '@/components/molecules/VSettingEntry.vue';
import VTextInput from '@/components/atoms/VTextInput.vue';

interface Props {
  src: string;
  srcPlaceholder: string;
}

withDefaults(defineProps<Props>(), {
  src: '',
  srcPlaceholder: ''
});

const emit = defineEmits(['set-setting']);
</script>