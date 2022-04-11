<template>
  <button :class="['button', `button--${variant}`]">
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'default' | 'red',
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default'
})
</script>

<style lang="scss" scoped>
.button {
  @apply block rounded drop-shadow dark:drop-shadow-none p-2 transition;

  &:hover {
    @apply scale-105;
  }

  &:active {
    @apply scale-100;
  }

  &--default {
    @apply bg-white dark:bg-gray-900;
  }

  &--red {
    @apply bg-red-500 dark:bg-red-600;
    @apply text-white;
  }
}
</style>