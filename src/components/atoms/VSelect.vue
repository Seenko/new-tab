<template>
  <select
    v-model="model"
  >
    <option
      v-if="slots.selectText"
      value=""
      disabled
    >
      <slot name="selectText" />
    </option>
    <option
      v-for="(option, index) in options"
      :key="index"
      :value="index"
      :selected="option === modelValue"
    >
      <slot
        name="option"
        :data="option"
      />
    </option>
  </select>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';

interface Props {
  options: Array<unknown>,
  modelValue: number
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  modelValue: undefined
});

const slots = useSlots();

const emit = defineEmits(['update:modelValue']);

const model = computed({ 
  get: () => props.modelValue, 
  set: (value) => emit('update:modelValue', value) 
});
</script>

<style lang="scss" scoped>
select {
  @apply w-full;
  @apply bg-gray-100 text-gray-800;
  @apply dark:bg-gray-800 dark:text-gray-100;

  @apply rounded drop-shadow dark:drop-shadow-none p-2;
}
</style>