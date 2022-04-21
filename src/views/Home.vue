<template>
  <v-main-layout>
    <v-home
      :widgets="settings.widgets"
      :is-editing-widgets="application.isEditingWidgets"
      @change="onChange($event)"
    />
  </v-main-layout>
</template>

<script setup lang="ts">
import { WidgetsGridChange } from '@/types/widgetsGrid'

import { useApplicationStore } from '@/store/application'
import { useSettingsStore } from '@/store/settings'

import VMainLayout from '@/components/layouts/VMainLayout.vue'
import VHome from '@/components/templates/VHome.vue'

const application = useApplicationStore()
const settings = useSettingsStore()

const onChange = (change: WidgetsGridChange) => settings.updateWidgetsPosition(change)
</script>