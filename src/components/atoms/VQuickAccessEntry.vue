<template>
  <a
    :href="href"
    rel="noreferrer"
  >
    <img
      :src="iconURL"
      alt=""
    >
    <slot />
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  icon: String,
  href: String
})

const iconURL = computed(() => {
  return props.icon ? props.icon : `chrome://favicon/${new URL(props.href as string).origin}`
})
</script>

<style lang="scss" scoped>
a {
  @apply flex flex-row align-middle items-center gap-1 transition;

  img {
    @apply w-4 h-4;
  }

  &:hover {
    @apply scale-105;
  }
}
</style>