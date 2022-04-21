<template>
  <widget v-show="settings.showGreeting">
    <v-greeting-widget
      :now="now"
    />
  </widget>
</template>

<script setup lang="ts">
import { useNow } from '@vueuse/core'
import { useSettingsStore } from '@/store/settings'

import Widget from '@/widgets/Widget.vue'
import VGreetingWidget from '@/components/widgets/VGreetingWidget.vue'

const now = useNow()
const settings = useSettingsStore()
</script>