<template>
  <v-greeting
    :now="now"	
  />
</template>

<script setup lang="ts">
import VGreeting from '@/components/atoms/VGreeting.vue'

defineProps({
  now: Date
})
</script>