<template>
  <div class="layout">
    <v-header
      :show-greeting="showGreeting"
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
      :show-network-status="showNetworkStatus"
      :is-online="isOnline"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNow, useOnline } from '@vueuse/core'

import { useSettingsState } from '@/store/settings'

import VHeader from '@/components/organisms/VHeader.vue'
import VFooter from '@/components/organisms/VFooter.vue'

const settings = useSettingsState()
const showGreeting = computed(() => settings.value.showGreeting)
const showNetworkStatus = computed(() => settings.value.showNetworkStatus)

const now = useNow()

const isOnline = useOnline()
</script>

<style lang="scss" scoped>
.layout {
  @apply min-h-screen flex flex-col overflow-hidden;

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