<template>
  <footer>
    <div class="flex items-center gap-4">
      <v-button @click="application.toggleIsSettingsPanelOpen()">
        ⚙️
      </v-button>
    </div>
    <div>
      <connection-status-widget
        v-if="showNetworkStatus"
      />
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/application'

import VButton from '@/components/atoms/VButton.vue'

import ConnectionStatusWidget from '@/widgets/ConnectionStatusWidget.vue'

const application = useApplicationStore()

defineProps({
  showNetworkStatus: Boolean
})
</script>

<style lang="scss" scoped>
footer {
  @apply flex flex-row justify-between items-center gap-1 p-4;

  flex-basis: 4.5rem;
}
</style>