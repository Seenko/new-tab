<template>
  <Transition name="fade">
    <div
      v-show="isOpen"
      class="blackout--sidebar"
    >
      <Transition :name="transitionAnimation">
        <div
          v-if="isOpen"
          ref="sidebar"
          :class="['sidebar', `sidebar--${position}`]"
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
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, computed, useSlots, nextTick } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';

interface Props {
  position?: 'left' | 'right',
  isOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  position: 'left',
  isOpen: false
});

const slots = useSlots();

const transitionAnimation = computed(() => `slide-in-from-${props.position}`);

const sidebar = ref();

const {
  activate: sidebarFocus,
  deactivate: sidebarUnfocus
} = useFocusTrap(sidebar);

watch(() => props.isOpen, (to) => {
  // Use nextTick to ensure the sidebar is rendered before focusing
  nextTick(() => {
    to ? sidebarFocus() : sidebarUnfocus();
  });
});

const emit = defineEmits(['blackout-click']);

onClickOutside(sidebar, () => {
  emit('blackout-click');
});
</script>

<style lang="scss" scoped>
.blackout--sidebar {
  @apply absolute inset-0;
  @apply bg-black/70 z-50;
}

.sidebar {
  @apply absolute top-0 bottom-0 z-30 w-full;
  @apply bg-gray-200 dark:bg-gray-900;
  @apply shadow-lg dark:shadow-none;
  @apply flex flex-col;
  @apply overflow-y-auto;

  &--left {
    @apply left-0;
  }

  &--right {
    @apply right-0;
  }

  &__content {
    @apply flex-1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-in-from {
  &-left,
  &-right {
    &-enter-active,
    &-leave-active {
      @apply transform duration-300;
    }
  }

  &-left {
    &-enter-from,
    &-leave-to {
      @apply -translate-x-full;
    }
  }

  &-right {
    &-enter-from,
    &-leave-to {
      @apply translate-x-full;
    }
  }
}
</style>