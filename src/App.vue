<template>
  <div
    class="layout"
    :style="{
      backgroundColor: settings.getBackgroundColor,
      backgroundImage: `url(${settings.getBackgroundImage})`
    }"
  >
    <v-header
      :show-greeting="settings.getShowGreeting"
      :now="now"
    />
    <main>
      <router-view v-slot="{ Component }">
        <transition mode="out-in" name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <v-footer
      :show-network-status="settings.getShowNetworkStatus"
      :is-online="isOnline"
    />
  </div>
</template>

<script setup lang="ts">
import { useNow, useOnline } from '@vueuse/core'

import { useSettingsStore } from '@/store/settings'

import VHeader from '@/components/organisms/VHeader.vue'
import VFooter from '@/components/organisms/VFooter.vue'

const settings = useSettingsStore()

const now = useNow()

const isOnline = useOnline()
</script>

<style lang="scss" scoped>
.layout {
  @apply min-h-screen flex flex-col overflow-hidden;
  @apply bg-no-repeat	bg-center	bg-cover;

  main {
    @apply flex flex-col grow;
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