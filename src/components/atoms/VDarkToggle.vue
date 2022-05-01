<template>
  <button
    class="theme"
    :class="isDark ? 'theme--dark' : 'theme--light'"
  >
    <span v-if="isDark">🌑</span>
    <span v-else>☀️</span>
  </button>
</template>

<script setup lang="ts">
defineProps({
  isDark: Boolean
});
</script>

<style lang="scss" scoped>
.theme {
  @apply block rounded-full drop-shadow p-2 transition;
  @apply bg-white dark:bg-gray-900;

  svg {
    @apply w-5 h-5;

    @apply fill-black;
    @apply dark:fill-white;
  }

  &:hover {
    @apply scale-105;
  }

  &:active {
    @apply scale-100;
  }
}
</style>