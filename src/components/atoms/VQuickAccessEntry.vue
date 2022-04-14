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
import { isRunningAsExtension } from '@/utils/browser'

const props = defineProps({
  icon: String,
  href: String
})

const iconURL = computed(() => {
  if (props.icon) {
    return props.icon
  } else {
    if (isRunningAsExtension) {
      return `chrome://favicon/${new URL(props.href as string).origin}`
    } else {
      return `https://www.google.com/s2/favicons?domain=${new URL(props.href as string).origin}`
    }
  }
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