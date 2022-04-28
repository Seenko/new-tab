<template>
  <widget>
    <v-connection-status-widget
      :isOnline="isOnline"
    />
  </widget>
</template>

<script setup lang="ts">
import { useOnline } from '@vueuse/core'

import Widget from '@/widgets/Widget.vue'
import VConnectionStatusWidget from '@/components/widgets/VConnectionStatusWidget.vue'

const isOnline = useOnline()
</script>