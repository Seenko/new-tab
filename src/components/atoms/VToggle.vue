<template>
  <button
    class="toggle"
    :class="{ 'toggle--toggled': toggled, 'toggle--disabled': disabled }"
    :disabled="disabled"
  >
    <span
      :class="['toggle__ball', toggled ? 'translate-x-6 ' : 'translate-x-1']"
    />
  </button>
</template>

<script setup lang="ts">
defineProps({
  toggled: Boolean,
  disabled: Boolean
});
</script>

<style lang="scss" scoped>
.toggle {
  @apply relative inline-flex items-center;
  @apply w-11 h-6 rounded-full;
  @apply duration-200;
  @apply bg-gray-400 dark:bg-gray-500;

  &--toggled {
    @apply bg-green-500 dark:bg-green-600;
  }

  &:disabled, &--disabled {
    @apply opacity-50;
  }

  &__ball {
    @apply inline-block w-4 h-4 transform duration-300 bg-white rounded-full translate-x-1;
  }
}
</style>