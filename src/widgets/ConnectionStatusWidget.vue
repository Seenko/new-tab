<template>
  <widget v-show="settings.showNetworkStatus">
    <v-connection-status-widget
      :isOnline="isOnline"
    />
  </widget>
</template>

<script setup lang="ts">
import { useOnline } from '@vueuse/core'
import { useSettingsStore } from '@/store/settings'

import Widget from '@/widgets/Widget.vue'
import VConnectionStatusWidget from '@/components/widgets/VConnectionStatusWidget.vue'

const isOnline = useOnline()
const settings = useSettingsStore()
</script>