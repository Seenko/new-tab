<template>
  <input
    type="color"
    v-model="color"
    @change="$emit('selected-color', color)"
  >
</template>

<script setup lang="ts">
defineProps({
  color: String
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