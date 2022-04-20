<template>
  <v-main-layout>
    <v-home
      :widgets="widgets"
      @change="onChange($event)"
    />
  </v-main-layout>
</template>

<script setup lang="ts">
import { computed, markRaw, onMounted } from 'vue'

import { useSettingsStore } from '@/store/settings'

import VMainLayout from '@/components/layouts/VMainLayout.vue'
import VHome from '@/components/templates/VHome.vue'

import GreetingWidget from '@/widgets/GreetingWidget.vue'
import ClockWidget from '@/widgets/ClockWidget.vue'
import QuickAccessWidget from '@/widgets/QuickAccessWidget.vue'
import NewsWidget from '@/widgets/NewsWidget.vue'
import WeatherWidget from '@/widgets/WeatherWidget.vue'

const settings = useSettingsStore()

const widgets = computed(() => {
  return [
    {
      name: 'GreetingWidget',
      component: markRaw(GreetingWidget),
      enabled: settings.showGreeting
    },
    {
      name: 'ClockWidget',
      component: markRaw(ClockWidget),
      enabled: settings.showClock
    },
    {
      name: 'QuickAccessWidget',
      component: markRaw(QuickAccessWidget),
      enabled: settings.showQuickAccess
    },
    {
      name: 'NewsWidget',
      component: markRaw(NewsWidget),
      enabled: settings.getShowNewsArticles
    },
    {
      name: 'WeatherWidget',
      component: markRaw(WeatherWidget),
      enabled: settings.getShowWeather
    }
  ].sort((a, b) => settings.widgetsOrder.indexOf(a.name) - settings.widgetsOrder.indexOf(b.name))
})

const onChange = (e: any) => {
  settings.updateWidgetsOrder(e.oldIndex, e.newIndex)
}
</script>