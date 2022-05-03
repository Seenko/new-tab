<template>
  <div
    :class="['widget', { 'widget--editing': isEditableAndisEditing }]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  isEditable?: boolean,
  isEditing?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isEditable: false,
  isEditing: false
});

const isEditableAndisEditing = computed(() => {
  return props.isEditable && props.isEditing;
});
</script>

<style lang="scss" scoped>
.widget {
  &--editing {
    @apply border-2 border-dotted border-gray-800/50 dark:border-gray-200/50 rounded-md p-2;
    @apply cursor-move;
    @apply brightness-75;

    &:hover {
      @apply brightness-100;
    }

    & > ::v-deep(*) {
      @apply pointer-events-none;
    }
  }

  &--ghost {
    @apply brightness-125 drop-shadow-2xl;
  }
}
</style>