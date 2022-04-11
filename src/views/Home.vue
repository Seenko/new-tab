<template>
  <v-home
    :show-clock-seconds="settings.getShowClockSeconds"
    :show-quick-access="settings.getShowQuickAccess"
    :quick-access-entries="quickAccessEntries"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getBrowserInstance, isRunningAsExtension } from '@/utils/browser'

import { quickAccessEntry } from '@/types/quickAccessEntry'

import { useSettingsStore } from '@/store/settings'
import { useQuickAccessStore } from '@/store/quickAccess'

import VHome from '@/components/templates/VHome.vue'

const settings = useSettingsStore()
const quickAccess = useQuickAccessStore()

const topSitesArray = ref<quickAccessEntry[]>()

const quickAccessEntries = computed(() => {
  if (settings.getAutoQuickAccessEntries) {
    if (topSitesArray.value && topSitesArray.value.length) {
      return topSitesArray.value
    } else {
      console.log('No top sites found! Probably because it\'s not running as extension.')
      console.log(`Running as extension? ${isRunningAsExtension ? 'Yes' : 'No'}`)
      return []
    }
  } else {
    return quickAccess.getQuickAccessEntries
  }
})

onMounted(() => {
  const topSites = getBrowserInstance().topSites

  if (topSites) {
    topSites.get((topSites) => {
      topSitesArray.value = topSites.map((topSite): quickAccessEntry => {
        return {
          name: topSite.title,
          href: topSite.url
        }
      }).slice(0, 5)
    })
  }
})
</script>