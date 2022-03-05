<template>
  <div :class="isOnline ? 'online' : 'offline'">
    <span aria-hidden="true"></span>
    <span v-if="isOnline">Online</span>
    <span v-else>No Network</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  isOnline: Boolean,
})
</script>

<style lang="scss" scoped>
div {
  @apply flex flex-row grow items-center gap-2 pl-2 overflow-hidden;

  & > span:first-child {
    @apply flex justify-center items-center;
    @apply h-3 w-3 rounded-full;

    &:before {
      content: '';
      @apply animate-ping block h-3 w-3 rounded-full opacity-75;
    }
  }

  &.online {
    & > span:first-child {
      @apply bg-green-400;
      &:before {
        @apply bg-green-500 dark:bg-green-400;
      }
    }
  }

  &.offline {
    & > span:first-child {
      @apply bg-red-400;
      &:before {
        @apply bg-red-500 dark:bg-red-400;
      }
    }
  }
}
</style>