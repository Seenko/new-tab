<template>
  <base-widget>
    <v-greeting-widget
      :now="now"
    />
  </base-widget>
</template>

<script setup lang="ts">
import { useNow } from '@vueuse/core'

import BaseWidget from '@/widgets/BaseWidget.vue'
import VGreetingWidget from '@/components/widgets/VGreetingWidget.vue'

const now = useNow()
</script>