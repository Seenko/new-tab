<template>
  <v-base-layout class="layout--main">
    <v-header
      :show-greeting="settings.showGreeting"
      :now="now"
    />
    <main>
      <slot />
    </main>
    <v-footer
      :show-network-status="settings.showNetworkStatus"
      :is-online="isOnline"
    />
  </v-base-layout>
</template>

<script setup lang="ts">
import { useNow, useOnline } from '@vueuse/core'

import { useApplicationStore } from '@/store/application'
import { useSettingsStore } from '@/store/settings'

import VBaseLayout from '@/components/layouts/VBaseLayout.vue'
import VHeader from '@/components/organisms/VHeader.vue'
import VFooter from '@/components/organisms/VFooter.vue'

const settings = useSettingsStore()
const application = useApplicationStore()
const now = useNow()
const isOnline = useOnline()
</script>

<style lang="scss" scoped>
.layout--main{
  main {
    @apply flex flex-col grow;
  }
}
</style>