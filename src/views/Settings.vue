<template>
  <v-settings
    :is-dark="isDark"
    :show-greeting="showGreeting"
    :show-clock-seconds="showClockSeconds"
    :show-quick-access="showQuickAccess"
    :show-network-status="showNetworkStatus"
    :version="manifestVersion"
    @toggle-dark="toggleDark()"
    @toggle-show-greeting="toggleShowGreeting()"
    @toggle-show-clock-seconds="toggleShowClockSeconds()"
    @toggle-show-quick-access="toggleShowQuickAccess()"
    @toggle-show-network-status="toggleShowNetworkStatus()"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useDark, useToggle } from '@vueuse/core'

import { useSettingsState } from '@/store/settings'

import VSettings from '@/components/templates/VSettings.vue'

const manifestVersion = ref('')

const settings = useSettingsState()

const isDark = useDark()
const toggleDark = useToggle(isDark)

const [showGreeting, toggleShowGreeting] = [computed(() => settings.value.showGreeting), () => { settings.value.showGreeting = !settings.value.showGreeting }]
const [showClockSeconds, toggleShowClockSeconds] = [computed(() => settings.value.showClockSeconds), () => { settings.value.showClockSeconds = !settings.value.showClockSeconds }]
const [showQuickAccess, toggleShowQuickAccess] = [computed(() => settings.value.showQuickAccess), () => { settings.value.showQuickAccess = !settings.value.showQuickAccess }]
const [showNetworkStatus, toggleShowNetworkStatus] = [computed(() => settings.value.showNetworkStatus), () => { settings.value.showNetworkStatus = !settings.value.showNetworkStatus }]

const getManifestVersion = async () => {
  // fetch(new URL('/manifest.json', import.meta.url).href)
  //   .then(res => res.json())
  //   .then(({ version, manifest_version }) => manifestVersion.value = `v${version} (m${manifest_version})`)
}

onMounted(() => {
  getManifestVersion()
})
</script>