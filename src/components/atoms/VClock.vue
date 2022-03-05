<template>
  <div>{{ currentHour }}</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNow } from '@vueuse/core'

interface Props {
  showSeconds?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showSeconds: false
})

const currentHour = computed(() => {
  const now = useNow()

  let options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: props.showSeconds ? 'numeric' : undefined
  }

  return now.value.toLocaleString(undefined, options)
})
</script>

<style lang="scss" scoped>
div {
  @apply text-6xl sm:text-8xl font-black;
}
</style>