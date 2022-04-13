<template>
  <v-home
    :show-clock-seconds="settings.getShowClockSeconds"
    :show-24-hour-clock="settings.getShow24HourClock"
    :show-quick-access="settings.getShowQuickAccess"
    :quick-access-entries="quickAccessEntries"
    :show-news-articles="settings.getShowNewsArticles"
    :can-fetch-articles="news.getCanFetchArticles"
    :fetching-articles="news.isLoading"
    :news-articles="news.getArticles"
    @fetch-news-articles="news.loadNewArticles()"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getBrowserInstance, isRunningAsExtension } from '@/utils/browser'

import { quickAccessEntry } from '@/types/quickAccessEntry'

import { useSettingsStore } from '@/store/settings'
import { useQuickAccessStore } from '@/store/quickAccess'
import { useNewsStore } from '@/store/news'

import VHome from '@/components/templates/VHome.vue'

const settings = useSettingsStore()
const quickAccess = useQuickAccessStore()
const news = useNewsStore()

const topSitesArray = ref<quickAccessEntry[]>()

const quickAccessEntries = computed(() => {
  if (settings.getAutoQuickAccessEntries) {
    if (isRunningAsExtension) {
      return (topSitesArray.value && topSitesArray.value.length) ? topSitesArray.value : []
    }

    // When not running as an extension, we can't get the top sites from the browser instance
    return []
  }
  
  return quickAccess.getQuickAccessEntries
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

  if (news.getCanFetchArticles) {
    news.loadNewArticles()
  }
})
</script>