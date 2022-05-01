<template>
  <div class="shortcuts">
    <div class="shortcuts__icons">
      <v-quick-access-entry
        v-for="entry in entries"
        :name="entry.name"
        :icon="entry.icon"
        :href="entry.href"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { quickAccessEntry } from '@/types/quickAccessEntry'

import { PropType } from 'vue'

import VQuickAccessEntry from '@/components/molecules/VQuickAccessEntry.vue'

defineProps({
  entries: Array as PropType<Array<quickAccessEntry>>
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