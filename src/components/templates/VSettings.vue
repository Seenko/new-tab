<template>
  <div class="settings">
    <div class="settings__top">
      <h1 class="settings__title">Settings</h1>
      <router-link
        :to="{ name: 'home' }"
      >
        <v-button>
          ❌
        </v-button>
      </router-link>
    </div>
    <div class="settings__panel">
      <div class="settings__setting">
        <label for="enableDarkMode">Enable Dark Mode</label>
        <v-toggle
          id="enableDarkMode"
          :toggled="isDark"
          @click="$emit('toggle-dark')"
        />
      </div>
      <div class="settings__setting">
        <label for="showGreeting">Show Greeting</label>
        <v-toggle
          id="showGreeting"
          :toggled="showGreeting"
          @click="$emit('toggle-show-greeting')"
        />
      </div>
      <div class="settings__setting">
        <label for="showClockSeconds">Show Seconds in Clock</label>
        <v-toggle
          id="showClockSeconds"
          :toggled="showClockSeconds"
          @click="$emit('toggle-show-clock-seconds')"
        />
      </div>
      <div class="settings__setting">
        <label for="showQuickAccess">Show Quick Access</label>
        <v-toggle
          id="showQuickAccess"
          :toggled="showQuickAccess"
          @click="$emit('toggle-show-quick-access')"
        />
      </div>
      <div class="settings__setting">
        <label for="showNetworkStatus">Show Network Status</label>
        <v-toggle
          id="showNetworkStatus"
          :toggled="showNetworkStatus"
          @click="$emit('toggle-show-network-status')"
        />
      </div>
    </div>
    <div class="settings__version">
      <small>{{ version }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import VToggle from '@/components/atoms/VToggle.vue'
import VButton from '@/components/atoms/VButton.vue'

defineProps({
  isDark: Boolean,
  showGreeting: Boolean,
  showClockSeconds: Boolean,
  showQuickAccess: Boolean,
  showNetworkStatus: Boolean,
  version: String
})
</script>

<style lang="scss" scoped>
.settings {
  @apply container max-w-sm flex flex-col grow justify-center items-center gap-8;

  &__top {
    @apply w-full flex justify-between items-center;
  }

  &__title {
    @apply text-2xl underline underline-offset-2 decoration-gray-300 dark:decoration-gray-600;
  }

  &__panel {
    @apply w-full flex flex-col gap-4 p-5 rounded;
    @apply bg-gray-200 dark:bg-gray-900;
  }

  &__setting {
    @apply flex items-center justify-between gap-2;

    &:not(:last-child) {
      @apply pb-4 border-b border-gray-300 dark:border-gray-800;
    }
  }

  &__version {
    @apply text-sm text-gray-500 dark:text-gray-400;
  }
}
</style>