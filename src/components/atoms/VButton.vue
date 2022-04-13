<template>
  <button
    :class="['button', `button--${variant}`, { 'button--disabled': disabled }]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'default' | 'red',
  disabled?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  disabled: false
})
</script>

<style lang="scss" scoped>
.button {
  @apply block rounded drop-shadow dark:drop-shadow-none p-2 transition;

  &:hover:not(.button--disabled) {
    @apply scale-105;
  }

  &:active:not(.button--disabled) {
    @apply scale-100;
  }

  &--disabled {
    @apply opacity-50;
  }

  &--default {
    @apply bg-white dark:bg-gray-800;
  }

  &--red {
    @apply bg-red-500 dark:bg-red-600;
    @apply text-white;
  }
}
</style>