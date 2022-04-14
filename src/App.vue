<template>
  <div
    class="wrapper"
    :style="{
      backgroundColor: settings.backgroundColor,
      backgroundImage: `url(${settings.backgroundImage})`
    }"
  >
    <v-sidebar-menu
      :is-open="application.isSettingsPanelOpen"
      ref="sidebar"
    >
      <template #header>
        <h1 class="sidebar__title">Settings</h1>
        <v-button @click="application.toggleIsSettingsPanelOpen()">
          ❌
        </v-button>
      </template>
      <v-settings
        class="sidebar__settings"
        :is-dark="darkMode"
        :show-greeting="settings.showGreeting"
        :show-clock-seconds="settings.showClockSeconds"
        :show-24-hour-clock="settings.show24HourClock"
        :show-quick-access="settings.showQuickAccess"
        :auto-quick-access-entries="settings.getAutoQuickAccessEntries"
        :show-news-articles="settings.getShowNewsArticles"
        :news-search-term="settings.newsSearchTerm"
        :news-catcher-api-key="settings.newsCatcherApiKey"
        :show-network-status="settings.showNetworkStatus"
        :background-color="settings.backgroundColor"
        :background-image="settings.backgroundImage"
        :is-running-as-extension="isRunningAsExtension"
        @toggle-dark="toggleDarkMode()"
        @toggle-show-greeting="settings.toggleShowGreeting()"
        @toggle-show-24-hour-clock="settings.toggleShow24HourClock()"
        @toggle-show-clock-seconds="settings.toggleShowClockSeconds()"
        @toggle-show-quick-access="settings.toggleShowQuickAccess()"
        @toggle-auto-quick-access-entries="settings.toggleAutoQuickAccessEntries()"
        @toggle-show-news-articles="settings.toggleShowNewsArticles()"
        @set-news-search-term="settings.setNewsSearchTerm($event)"
        @set-newscatcher-api-key="updateNewsCatcherApiKey($event)"
        @toggle-show-network-status="settings.toggleShowNetworkStatus()"
        @set-background-color="settings.setBackgroundColor($event)"
        @set-background-image="settings.setBackgroundImage($event)"
        @reset-settings="settings.resetSettings()"
      />
      <template #footer>
        <div class="sidebar__version">
          {{ manifestVersion }}
        </div>
      </template>
    </v-sidebar-menu>
    <router-view v-slot="{ Component }">
      <transition mode="out-in" name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useDark, useToggle, onClickOutside } from '@vueuse/core'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { isRunningAsExtension } from '@/utils/browser'
import NewsService from '@/services/news'

import { useApplicationStore } from '@/store/application'
import { useSettingsStore } from '@/store/settings'

import VButton from '@/components/atoms/VButton.vue'
import VSidebarMenu from '@/components/molecules/VSidebarMenu.vue'
import VSettings from '@/components/organisms/VSettings.vue'

const settings = useSettingsStore()
const application = useApplicationStore()

const darkMode = useDark()
const toggleDarkMode = useToggle(darkMode)

const sidebar = ref()
const {
  hasFocus: sidebarHasFocus,
  activate: sidebarFocus,
  deactivate: sidebarUnfocus
} = useFocusTrap(sidebar)

watch(() => application.isSettingsPanelOpen, async (to) => {
  to ? sidebarFocus() : sidebarUnfocus()
})

onClickOutside(sidebar, () => {
  if (application.isSettingsPanelOpen) {
    application.toggleIsSettingsPanelOpen()
  }
})

const updateNewsCatcherApiKey = (newToken: string) => {
  settings.setNewsCatcherApiKey(newToken)
  NewsService.init(newToken)
}

const manifestVersion = computed(() => {
  if (isRunningAsExtension) {
    const { version, manifest_version } = chrome.runtime.getManifest()
    return `v${version} (m${manifest_version})`
  }
  
  return `DEBUG`
})
</script>

<style lang="scss" scoped>
.wrapper {
  @apply min-h-screen overflow-hidden;

  .sidebar {
    @apply max-w-sm;

    & > ::v-deep(*) {
      @apply p-5;
    }

    ::v-deep(.sidebar__header) {
      @apply flex flex-row justify-between gap-4;
    }

    &__title {
      @apply text-2xl font-serif;
    }

    // &__settings {
    // }

    &__version {
      @apply text-center;
      @apply text-sm text-gray-500 dark:text-gray-400;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>