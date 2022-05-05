<template>
  <div class="alert">
    <div class="alert__content">
      <div
        v-if="slots.icon"
        class="alert__icon"
      >
        <slot name="icon" />
      </div>
      <div>
        <slot />
      </div>
    </div>
    <div
      v-if="slots.footer"
      class="alert__footer"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';

const slots = useSlots();
</script>

<style lang="scss" scoped>
.alert {
  @apply flex flex-col gap-2;
  @apply rounded p-2;
  @apply bg-gray-300 dark:bg-gray-800;
  @apply border border-gray-400 dark:border-gray-700;

  &__content {
    @apply flex flex-row gap-2;
  }
}
</style>