<template>
  <input type="text" v-model="message">
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  'modelValue': String
})

const emit = defineEmits(['update:modelValue'])

const message = computed({ 
  get: () => props.modelValue, 
  set: (value) => emit('update:modelValue', value) 
})
</script>

<style lang="scss" scoped>
input {
  @apply w-full;
  @apply bg-gray-100 text-gray-800;
  @apply dark:bg-gray-800 dark:text-gray-100;

  @apply rounded drop-shadow dark:drop-shadow-none p-2;
}
</style>