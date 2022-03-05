<template>
  <div class="home">
    <v-clock
      :show-seconds="showClockSeconds"
    />
    <div
      v-if="showQuickAccess"
      class="home__quickAccess"
    >
      <hr />
      <div class="quickAccess__icons">
        <v-quick-access-entry
          v-for="entry in quickAccessEntries"
          :icon="entry.icon"
          :href="entry.href"
        >
          {{ entry.name }}
        </v-quick-access-entry>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { quickAccessEntry } from '@/types/quickAccessEntry';

import VClock from '@/components/atoms/VClock.vue'
import VQuickAccessEntry from '@/components/atoms/VQuickAccessEntry.vue'

defineProps({
  showClockSeconds: Boolean,
  showQuickAccess: Boolean,
  quickAccessEntries: Array as PropType<Array<quickAccessEntry>>,
})
</script>

<style lang="scss" scoped>
.home {
  @apply container flex flex-col grow justify-center items-center;

  &__quickAccess {
    hr {
      @apply max-w-md my-3;
    }

    .quickAccess {
      &__icons {
        @apply flex flex-col justify-center items-center gap-4;
      }
    }
  }
}
</style>