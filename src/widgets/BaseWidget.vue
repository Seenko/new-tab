<template>
  <v-widget
    :is-editing-widgets="application.isEditingWidgets"
  >
    <slot />
  </v-widget>
</template>

<script setup lang="ts">
import VWidget from '@/components/widgets/VWidget.vue';

import { useApplicationStore } from '@/store/application';

const application = useApplicationStore();
</script>