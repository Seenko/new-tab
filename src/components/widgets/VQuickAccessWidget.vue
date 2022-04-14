<template>
  <div class="shortcuts">
    <div class="shortcuts__icons">
      <v-quick-access-entry
        v-for="entry in entries"
        :icon="entry.icon"
        :href="entry.href"
      >
        {{ entry.name }}
      </v-quick-access-entry>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { quickAccessEntry } from '@/types/quickAccessEntry'
import { PropType } from 'vue'

import VQuickAccessEntry from '@/components/atoms/VQuickAccessEntry.vue'

defineProps({
  entries: Array as PropType<Array<quickAccessEntry>>
})
</script>

<style lang="scss" scoped>
.shortcuts {
    &__icons {
      @apply flex flex-col justify-center items-center gap-4;
    }
  }
</style>