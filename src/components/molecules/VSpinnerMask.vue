<template>
  <div class="mask">
    <v-spinner class="spinner" />
  </div>
</template>

<script setup lang="ts">
import VSpinner from '@/components/atoms/VSpinner.vue'
</script>

<style lang="scss" scoped>
.mask {
  @apply absolute w-full h-full z-50;
  @apply top-0 right-0 bottom-0 left-0;
  @apply flex justify-center items-center;
  @apply bg-black/40;
}
</style>