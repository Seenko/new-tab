<template>
  <div
    :class="[
      'setting',
      {'setting--descriptive': slots.description},
      {'setting--sub': isSubSetting},
      {'setting--stacked': isStacked},
      {'setting--no-border': noBottomBorder},
      {'setting--sr-only-label': srOnlyLabel}
    ]"
  >
    <div class="setting__text">
      <label :for="labelId">
        <span>
          <slot name="label" />
        </span>
        <small v-if="slots.description">
          <slot name="description" />
        </small>
      </label>
    </div>
    <div class="setting__control">
      <slot name="control" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';

const slots = useSlots();

defineProps({
  labelId: { type: String, required: true },
  isSubSetting: Boolean,
  isStacked: Boolean,
  noBottomBorder: Boolean,
  srOnlyLabel: Boolean
});
</script>

<style lang="scss" scoped>
.setting {
  @apply flex items-center justify-between gap-2;

  &:not(:last-child) {
    @apply pb-4 border-b border-gray-300 dark:border-gray-800;
  }

  &--stacked {
    @apply flex-col items-start;

    & > .setting__control {
      @apply w-full flex-col;
    }
  }

  &--descriptive {
    .setting__text > label {
      @apply flex flex-col;

      small {
        @apply text-gray-500 dark:text-gray-400;
      }
    }
  }

  &--sub {
    @apply relative pl-6;
  }

  &--no-border, &--no-border:not(:last-child) {
    @apply border-none pb-0;
  }

  &--sr-only-label {
    .setting__text {
      @apply sr-only;
    }
  }

  *:nth-child(2) {
    @apply self-start;
  }

  &__control {
    @apply flex gap-2;
  }
}
</style>