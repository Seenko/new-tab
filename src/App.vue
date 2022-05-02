<template>
  <div
    class="wrapper"
    :style="{
      backgroundColor: settings.backgroundColor,
      backgroundImage: `url(${settings.backgroundImage})`
    }"
  >
    <v-sidebar-menu
      ref="sidebar"
      :is-open="application.isSettingsPanelOpen"
    >
      <template #header>
        <h1 class="sidebar__title">
          Settings
        </h1>
        <v-button
          class="sidebar__close"
          aria-label="Close settings"
          @click="application.toggleIsSettingsPanelOpen()"
        >
          <CloseIcon />
        </v-button>
      </template>
      <v-settings
        class="sidebar__settings"
        :is-dark="darkMode"
        :auto-quick-access-entries="settings.getAutoQuickAccessEntries"
        :news-api-key="apiKeys.news"
        :weather-api-key="apiKeys.weather"
        :show-network-status="settings.showNetworkStatus"
        :background-color="settings.backgroundColor"
        :enable-custom-background-image="settings.enableCustomBackgroundImage"
        :background-image="settings.backgroundImage"
        :is-running-as-extension="isRunningAsExtension"
        @toggle-dark="toggleDarkMode()"
        @toggle-auto-quick-access-entries="settings.toggleAutoQuickAccessEntries()"
        @set-news-api-key="updateNewsApiKey($event)"
        @set-weather-api-key="updateWeatherApiKey($event)"
        @toggle-show-network-status="settings.toggleShowNetworkStatus()"
        @set-background-color="settings.setBackgroundColor($event)"
        @toggle-enable-custom-background-image="settings.toggleEnableCustomBackgroundImage()"
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
      <transition
        mode="out-in"
        name="fade"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useDark, useToggle, onClickOutside } from '@vueuse/core';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { isRunningAsExtension } from '@/utils/browser';

import NewsService from '@/services/news';
import WeatherService from '@/services/weather';

import { useApplicationStore } from '@/store/application';
import { useSettingsStore } from '@/store/settings';
import { useApiKeysStore } from '@/store/apiKeys';

import VButton from '@/components/atoms/VButton.vue';
import VSidebarMenu from '@/components/molecules/VSidebarMenu.vue';
import VSettings from '@/components/organisms/VSettings.vue';

import CloseIcon from '@/assets/icons/close.svg';

const settings = useSettingsStore();
const apiKeys = useApiKeysStore();
const application = useApplicationStore();

const darkMode = useDark();
const toggleDarkMode = useToggle(darkMode);

const sidebar = ref();
const {
  activate: sidebarFocus,
  deactivate: sidebarUnfocus
} = useFocusTrap(sidebar);

watch(() => application.isSettingsPanelOpen, async (to) => {
  to ? sidebarFocus() : sidebarUnfocus();
});

onClickOutside(sidebar, () => {
  if (application.isSettingsPanelOpen) {
    application.toggleIsSettingsPanelOpen();
  }
});

const updateNewsApiKey = (newToken: string) => {
  apiKeys.setNewsApiKey(newToken);
  NewsService.init(newToken);
};

const updateWeatherApiKey = (newToken: string) => {
  apiKeys.setWeatherApiKey(newToken);
  WeatherService.init(newToken);
};

const manifestVersion = computed(() => {
  if (isRunningAsExtension) {
    // eslint-disable-next-line no-undef
    const { version, manifest_version } = chrome.runtime.getManifest();
    return `v${version} (m${manifest_version})`;
  }
  
  return 'DEBUG';
});
</script>

<style lang="scss" scoped>
.wrapper {
  @apply min-h-screen overflow-hidden;
  @apply bg-center bg-cover bg-no-repeat;

  .sidebar {
    @apply max-w-sm fixed;

    & > ::v-deep(*) {
      @apply p-5;
    }

    ::v-deep(.sidebar__header) {
      @apply flex flex-row justify-between gap-4;
    }

    &__title {
      @apply text-2xl font-serif;
    }

    &__close svg {
      @apply w-4 h-4;
    }

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