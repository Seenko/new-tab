<template>
  <div>{{ currentHour }}</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  now: {
    type: Date,
    required: true
  },
  showClockSeconds: Boolean,
  show24HourClock: Boolean
})

const currentHour = computed(() => {
  let options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: props.showClockSeconds ? 'numeric' : undefined,
    hourCycle: props.show24HourClock ? 'h24' : 'h12'
  }

  return props.now.toLocaleString(undefined, options)
})
</script>

<style lang="scss" scoped>
div {
  @apply text-6xl sm:text-8xl font-black;
}
</style>