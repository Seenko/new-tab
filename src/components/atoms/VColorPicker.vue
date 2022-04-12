<template>
  <input
    type="color"
    v-model="currentColor"
    @input="$emit('input-color', currentColor)"
    @change="$emit('selected-color', currentColor)"
  >
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  color: String
})

const color = ref(props.color)

const currentColor = computed({
  get() {
    return props.color ? (color.value ? color.value : '#000000') : '#000000'
  },
  set(newColor: string) {
    color.value = newColor
  }
})


</script>

<style lang="scss" scoped>
input {
  @apply cursor-pointer;

  &::-webkit-color-swatch-wrapper {
    @apply flex border-none p-0 bg-white;
  }
}
</style>