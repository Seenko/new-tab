<template>
  <v-setting-entry label-id="tag">
    <template #label>
      Size
    </template>
    <template #control>
      <v-select
        :options="tagList"
        :model-value="tag"
        @update:model-value="emit('set-setting', { id: 'tag', value: $event })"
      >
        <template #option="{ data }">
          {{ data.name }}
        </template>
      </v-select>
    </template>
  </v-setting-entry>
  <v-setting-entry label-id="textStyle">
    <template #label>
      Font Style
    </template>
    <template #control>
      <v-select
        :options="textStyleList"
        :model-value="textStyle"
        @update:model-value="emit('set-setting', { id: 'textStyle', value: $event })"
      >
        <template #option="{ data }">
          {{ data.name }}
        </template>
      </v-select>
    </template>
  </v-setting-entry>
  <v-setting-entry label-id="textString">
    <template #label>
      Text
    </template>
    <template #control>
      <v-text-input
        :model-value="textString"
        :placeholder="textStringPlaceholder"
        @update:model-value="emit('set-setting', { id: 'textString', value: $event })"
      />
    </template>
  </v-setting-entry>
</template>

<script setup lang="ts">
import VSettingEntry from '@/components/molecules/VSettingEntry.vue';
import VSelect from '@/components/atoms/VSelect.vue';
import VTextInput from '@/components/atoms/VTextInput.vue';

interface Props {
  tag: number;
  tagList: Array<string>;
  textStyle: number;
  textStyleList: Array<string>;
  textString: string;
  textStringPlaceholder: string;
}

withDefaults(defineProps<Props>(), {
  tag: 0,
  tagList: () => ([]),
  textStyle: 0,
  textStyleList: () => ([]),
  textString: '',
  textStringPlaceholder: ''
});

const emit = defineEmits(['set-setting']);
</script>