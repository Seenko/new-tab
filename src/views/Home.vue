<template>
  <v-home
    :show-clock-seconds="showClockSeconds"
    :show-quick-access="showQuickAccess"
    :quick-access-entries="quickAccessEntries"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getBrowserInstance } from '@/utils/browser'

import { quickAccessEntry } from '@/types/quickAccessEntry'

import { useSettingsState } from '@/store/settings'
import { useQuickAccessState } from '@/store/quickAccess'

import VHome from '@/components/templates/VHome.vue'

const settings = useSettingsState()
const showClockSeconds = computed(() => settings.value.showClockSeconds)
const showQuickAccess = computed(() => settings.value.showQuickAccess)

const topSitesArray = ref<quickAccessEntry[]>()

const quickAccessEntries = computed(() => {
  return (topSitesArray.value && topSitesArray.value.length) ? topSitesArray.value : useQuickAccessState().value
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