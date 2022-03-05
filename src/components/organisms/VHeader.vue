<template>
  <header>
    <div>
      <v-greeting
        v-if="showGreeting"
        :now="now"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import VGreeting from '@/components/atoms/VGreeting.vue'

defineProps({
  showGreeting: Boolean,
  now: Date
})
</script>

<style lang="scss" scoped>
header {
  @apply flex flex-row justify-between items-center gap-1 p-4;

  h1 {
    @apply text-2xl font-serif;
  }
}
</style>