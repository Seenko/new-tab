<template>
  <button
    class="toggle"
    :class="{ 'toggle--toggled': toggled, 'toggle--disabled': disabled }"
    :disabled="disabled"
    :aria-checked="toggled"
    role="switch"
  >
    <div class="toggle__track">
      <span class="toggle__ball" />
    </div>
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
        @apply translate-x-5;
      }
    }
  }

  &:disabled, &--disabled {
    @apply opacity-50;
  }

  &__track, &__ball {
    @apply transform duration-300;
    transition-timing-function: cubic-bezier(0.680, -0.550, 0.265, 1.550);
  }

  &__track {
    @apply flex items-center justify-start;
    @apply w-full h-4 rounded-full mx-1;
    @apply overflow-hidden;
  }

  &__ball {
    @apply w-full h-full bg-white rounded-full;
    @apply -translate-x-5;
  }
}
</style>