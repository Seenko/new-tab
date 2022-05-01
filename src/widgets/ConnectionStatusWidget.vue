<template>
  <base-widget>
    <v-connection-status-widget
      :is-online="isOnline"
    />
  </base-widget>
</template>

<script setup lang="ts">
import { useOnline } from '@vueuse/core'

import BaseWidget from '@/widgets/BaseWidget.vue'
import VConnectionStatusWidget from '@/components/widgets/VConnectionStatusWidget.vue'

const isOnline = useOnline()
</script>