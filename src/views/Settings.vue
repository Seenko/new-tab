<template>
  <v-settings
    :is-dark="isDark"
    :show-greeting="settings.getShowGreeting"
    :show-clock-seconds="settings.getShowClockSeconds"
    :show-24-hour-clock="settings.getShow24HourClock"
    :show-quick-access="settings.getShowQuickAccess"
    :auto-quick-access-entries="settings.getAutoQuickAccessEntries"
    :show-news-articles="settings.getShowNewsArticles"
    :news-catcher-api-key="settings.getNewsCatcherApiKey"
    :show-network-status="settings.getShowNetworkStatus"
    :background-color="settings.getBackgroundColor"
    :background-image="settings.getBackgroundImage"
    :version="manifestVersion"
    :is-running-as-extension="isRunningAsExtension"
    @toggle-dark="toggleDark()"
    @toggle-show-greeting="settings.toggleShowGreeting()"
    @toggle-show-24-hour-clock="settings.toggleShow24HourClock()"
    @toggle-show-clock-seconds="settings.toggleShowClockSeconds()"
    @toggle-show-quick-access="settings.toggleShowQuickAccess()"
    @toggle-auto-quick-access-entries="settings.toggleAutoQuickAccessEntries()"
    @toggle-show-news-articles="settings.toggleShowNewsArticles()"
    @set-newscatcher-api-key="updateNewsCatcherApiKey($event)"
    @toggle-show-network-status="settings.toggleShowNetworkStatus()"
    @set-background-color="settings.setBackgroundColor($event)"
    @set-background-image="settings.setBackgroundImage($event)"
    @reset-settings="settings.resetSettings()"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { isRunningAsExtension } from '@/utils/browser'

import { useDark, useToggle } from '@vueuse/core'
import { useSettingsStore } from '@/store/settings'
import NewsService from '@/services/news'

import VSettings from '@/components/templates/VSettings.vue'

const settings = useSettingsStore()

const updateNewsCatcherApiKey = (newToken: string) => {
  settings.setNewsCatcherApiKey(newToken)
  NewsService.init(newToken)
}

const isDark = useDark()
const toggleDark = useToggle(isDark)

const manifestVersion = computed(() => {
  if (isRunningAsExtension) {
    const { version, manifest_version } = chrome.runtime.getManifest()
    return `v${version} (m${manifest_version})`
  }
  
  return `DEBUG`
})
</script>