<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="blackout"
      >
        <dialog
          ref="dialog"
          class="modal"
          :open="isOpen"
        >
          <div class="modal__header">
            <slot name="header" />
            <v-button
              class="modal__close"
              aria-label="Close"
              @click="emit('close')"
            >
              <CloseIcon />
            </v-button>
          </div>
          <div class="modal__content">
            <slot name="content" />
          </div>
          <div
            v-if="slots.footer"
            class="modal__footer"
          >
            <slot name="footer" />
          </div>
        </dialog>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, useSlots } from 'vue';
import { onClickOutside, onKeyStroke } from '@vueuse/core';

import VButton from '@/components/atoms/VButton.vue';

import CloseIcon from '@/assets/icons/close.svg';

interface Props {
  isOpen: boolean,
  isDismissable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  isDismissable: true
});

const slots = useSlots();

const emit = defineEmits(['close']);

const dismiss = () => {
  if (props.isDismissable && props.isOpen) {
    emit('close');
  }
};

const dialog = ref();
onClickOutside(dialog, () => dismiss());
onKeyStroke('Escape', () => dismiss());
</script>

<style lang="scss" scoped>
.blackout, .modal {
  @apply fixed inset-0;
}

.blackout {
  @apply bg-black/70 z-50;
}

.modal {
  @apply bg-gray-200 text-gray-800;
  @apply dark:bg-gray-900 dark:text-gray-100;
  @apply border border-slate-300 dark:border-slate-700;

  @apply rounded-lg;
  @apply flex flex-col gap-8;
  @apply container max-w-sm;

  &__header {
    @apply flex flex-row justify-between items-center;
    @apply font-serif text-2xl;
  }
}

.fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.075s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>