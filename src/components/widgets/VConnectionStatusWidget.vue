<template>
  <v-connection-status
    :is-online="isOnline"
  />
</template>

<script setup lang="ts">
import VConnectionStatus from '@/components/atoms/VConnectionStatus.vue'

defineProps({
  isOnline: Boolean
})
</script>