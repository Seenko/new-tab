<template>
  <h1>{{ greeting }}</h1>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  now: Date
})

const greeting = computed(() => {
  const currentHour = props.now!.getHours()

  if (currentHour < 12) {
    return 'Good Morning'
  } else if (currentHour < 17) {
    return 'Good Afternoon'
  } else {
    return 'Good Evening'
  }
})
</script>