<template>
  <div class="shortcuts">
    <div class="shortcuts__icons">
      <v-quick-access-entry
        v-for="(entry, index) in entries"
        :key="index"
        :name="entry.name"
        :icon="entry.icon"
        :href="entry.href"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { quickAccessEntry } from '@/types/quickAccessEntry'

import VQuickAccessEntry from '@/components/molecules/VQuickAccessEntry.vue'

interface Props {
  entries: quickAccessEntry[]
}

withDefaults(defineProps<Props>(),{
  entries: () => []
})
</script>

<style lang="scss" scoped>
.shortcuts {
    &__icons {
      @apply flex flex-row flex-wrap justify-center items-center gap-4;
      @apply max-w-sm;
    }
  }
</style>