<template>
  <footer>
    <div class="flex items-center gap-4">
      <router-link
        v-if="$route.name !== 'settings'"
        :to="{ name: 'settings' }"
      >
        <v-button>
          ⚙️
        </v-button>
      </router-link>
    </div>
    <div>
      <v-connection-status
        v-if="showNetworkStatus"
        :is-online="isOnline"
      />
    </div>
  </footer>
</template>

<script setup lang="ts">
import VConnectionStatus from '@/components/atoms/VConnectionStatus.vue'
import VButton from '@/components/atoms/VButton.vue'

defineProps({
  showNetworkStatus: Boolean,
  isOnline: Boolean,
})
</script>

<style lang="scss" scoped>
footer {
  @apply flex flex-row justify-between items-center gap-1 p-4;
  @apply bg-gradient-to-t from-slate-200 dark:from-slate-800 via-transparent;

  flex-basis: 4.5rem;
}
</style>