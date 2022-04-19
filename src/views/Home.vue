<template>
  <v-main-layout>
    <v-home
      :show-greeting="settings.showGreeting"
      :show-clock="settings.showClock"
      :show-quick-access="settings.showQuickAccess"
      :show-news-articles="settings.getShowNewsArticles"
      :show-weather="settings.getShowWeather"
    />
  </v-main-layout>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/store/settings'

import VMainLayout from '@/components/layouts/VMainLayout.vue'
import VHome from '@/components/templates/VHome.vue'

const settings = useSettingsStore()
</script>