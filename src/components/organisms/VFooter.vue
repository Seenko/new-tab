<template>
  <footer>
    <div class="flex items-center gap-4">
      <v-button @click="application.toggleIsSettingsPanelOpen()">
        ⚙️
      </v-button>
    </div>
    <div>
      <v-connection-status
        v-if="showNetworkStatus"
        :is-online="isOnline"
      />
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/application'

import VConnectionStatus from '@/components/atoms/VConnectionStatus.vue'
import VButton from '@/components/atoms/VButton.vue'

const application = useApplicationStore()

defineProps({
  showNetworkStatus: Boolean,
  isOnline: Boolean,
})
</script>

<style lang="scss" scoped>
footer {
  @apply flex flex-row justify-between items-center gap-1 p-4;

  flex-basis: 4.5rem;
}
</style>