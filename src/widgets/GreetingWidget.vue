<template>
  <widget>
    <v-greeting-widget
      :now="now"
    />
  </widget>
</template>

<script setup lang="ts">
import { useNow } from '@vueuse/core'

import Widget from '@/widgets/Widget.vue'
import VGreetingWidget from '@/components/widgets/VGreetingWidget.vue'

const now = useNow()
</script>