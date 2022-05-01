<template>
  <component
    :is="tag"
    :class="['button', `button--${variant}`, { 'button--animated': animated }, { 'button--disabled': disabled }]"
    :disabled="disabled"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
interface Props {
  tag?: 'button' | 'a',
  variant?: 'default' | 'icon' | 'red',
  disabled?: boolean,
  animated?: boolean
}

withDefaults(defineProps<Props>(), {
  tag: 'button',
  variant: 'default',
  disabled: false,
  animated: true
});
</script>

<style lang="scss" scoped>
.button {
  @apply block rounded drop-shadow dark:drop-shadow-none p-2 transition;

  &--animated {
    &:hover:not(.button--disabled) {
      @apply scale-105;
    }

    &:active:not(.button--disabled) {
      @apply scale-100;
    }
  }

  &--disabled {
    @apply opacity-50;
  }

  &--default {
    @apply bg-white dark:bg-gray-800;
  }

  &--icon {
    @apply bg-transparent;
  }

  &--red {
    @apply bg-red-500 dark:bg-red-600;
    @apply text-white;
  }
}
</style>