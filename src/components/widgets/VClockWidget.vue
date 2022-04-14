<template>
  <v-clock
    :now="now"
    :show-clock-seconds="showClockSeconds"
    :show-24-hour-clock="show24HourClock"
  />
</template>

<script setup lang="ts">
import VClock from '@/components/atoms/VClock.vue'

defineProps({
  now: {
    type: Date,
    required: true
  },
  showClockSeconds: Boolean,
  show24HourClock: Boolean
})
</script>