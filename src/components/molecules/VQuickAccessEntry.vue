<template>
  <v-button
    class="entry"
    tag="a"
    :href="href"
    rel="noreferrer"
  >
    <img
      class="entry__icon"
      :src="iconURL"
      alt=""
    >
    <p class="entry__name">
      {{ parsedName }}
    </p>
  </v-button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { isRunningAsExtension } from '@/utils/browser'

import VButton from '@/components/atoms/VButton.vue'

interface Props {
  name: string,
  icon: string,
  href: string
}

const props = withDefaults(defineProps<Props>(),{
  name: '',
  icon: '',
  href: ''
})

const parsedName = computed(() => {
  return new URL(props.href as string).hostname.replace(/^www\./, '')
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
.entry {
  @apply flex flex-row align-middle items-center gap-2 transition;
  
  &:hover {
    @apply scale-105;
  }

  &__icon {
    @apply w-4 h-4;
  }
}
</style>