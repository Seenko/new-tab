<template>
  <v-settings
    :is-dark="isDark"
    :show-greeting="settings.getShowGreeting"
    :show-clock-seconds="settings.getShowClockSeconds"
    :show-quick-access="settings.getShowQuickAccess"
    :auto-quick-access-entries="settings.getAutoQuickAccessEntries"
    :show-network-status="settings.getShowNetworkStatus"
    :background-color="settings.getBackgroundColor"
    :background-image="settings.getBackgroundImage"
    :version="manifestVersion"
    @toggle-dark="toggleDark()"
    @toggle-show-greeting="settings.toggleShowGreeting()"
    @toggle-show-clock-seconds="settings.toggleShowClockSeconds()"
    @toggle-show-quick-access="settings.toggleShowQuickAccess()"
    @toggle-auto-quick-access-entries="settings.toggleAutoQuickAccessEntries()"
    @toggle-show-network-status="settings.toggleShowNetworkStatus()"
    @set-background-color="settings.setBackgroundColor($event)"
    @set-background-image="settings.setBackgroundImage($event)"
    @reset-settings="settings.resetSettings()"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { isRunningAsExtension } from '@/utils/browser'

import { useDark, useToggle } from '@vueuse/core'
import { useSettingsStore } from '@/store/settings'

import VSettings from '@/components/templates/VSettings.vue'

const manifestVersion = ref('')

const settings = useSettingsStore()

const isDark = useDark()
const toggleDark = useToggle(isDark)

const getManifestVersion = async () => {
  // Making this non-static so Vite won't try to transform at build.
  let manifestLocation = '/manifest.json'
  fetch(new URL(manifestLocation, import.meta.url).href)
    .then(res => res.json())
    .then(({ version, manifest_version }) => manifestVersion.value = `v${version} (m${manifest_version}) (${isRunningAsExtension ? 'EXT' : 'DEBUG'})`)
}

onMounted(() => {
  getManifestVersion()
})
</script>