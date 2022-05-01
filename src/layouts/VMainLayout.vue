<template>
  <v-base-layout class="layout--main">
    <v-header />
    <main>
      <slot />
    </main>
    <v-footer
      :show-network-status="settings.showNetworkStatus"
    />
  </v-base-layout>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/store/settings';

import VBaseLayout from '@/layouts/VBaseLayout.vue';
import VHeader from '@/components/organisms/VHeader.vue';
import VFooter from '@/components/organisms/VFooter.vue';

const settings = useSettingsStore();
</script>

<style lang="scss" scoped>
.layout--main{
  main {
    @apply flex flex-col grow;
  }
}
</style>