<template>
  <button
    class="toggle"
    :class="{ 'toggle--toggled': toggled, 'toggle--disabled': disabled }"
    :disabled="disabled"
    :aria-checked="toggled"
    role="switch"
  >
    <span class="toggle__ball" />
  </button>
</template>

<script setup lang="ts">
interface Props {
  toggled?: boolean;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  toggled: false,
  disabled: false
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

    .toggle {
      &__ball {
        @apply translate-x-6;
      }
    }
  }

  &:disabled, &--disabled {
    @apply opacity-50;
  }

  &__ball {
    @apply transform duration-300 translate-x-1;
    @apply inline-block w-4 h-4 bg-white rounded-full;
  }
}
</style>