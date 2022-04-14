<template>
  <div
    :class="['sidebar', `sidebar--${position}`, {'sidebar--animated': isAnimated}, {'sidebar--open': isOpen}]"
  >
    <div
      v-if="slots.header"
      class="sidebar__header"
    >
      <slot name="header" />
    </div>
    <div class="sidebar__content">
      <slot />
    </div>
    <div
      v-if="slots.footer"
      class="sidebar__footer"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, useSlots } from 'vue'

interface Props {
  position?: 'left' | 'right',
  isOpen?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  position: 'left',
  isOpen: false
})

const slots = useSlots()
const isAnimated = ref(false)

// Only apply animation if the sidebar has been interacted with,
// solves a bug with animation playing on page load unnecessarily
watch(() => props.isOpen, () => {
  isAnimated.value = true
})

</script>

<style lang="scss" scoped>
.sidebar {
  @apply absolute top-0 bottom-0 z-30 w-full;
  @apply bg-gray-200 dark:bg-gray-900;
  @apply shadow-lg dark:shadow-none;
  @apply flex flex-col;
  @apply overflow-y-auto;

  &--animated {
    @apply transform duration-300;
  }

  // &--open {
  //   @apply visible;
  // }

  // &--closed {
  //   @apply invisible;
  // }

  &--left {
    @apply left-0;
    @apply -translate-x-full;

    &.sidebar {
      &--open {
        @apply translate-x-0;
      }
    }
  }

  &--right {
    @apply right-0;
    @apply translate-x-full;

    &.sidebar {
      &--open {
        @apply translate-x-0;
      }     
    }
  }

  &__content {
    @apply flex-1;
  }
}
</style>