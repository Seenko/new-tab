<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="blackout"
    >
      <dialog
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
  </Teleport>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';

import VButton from '@/components/atoms/VButton.vue';

import CloseIcon from '@/assets/icons/close.svg';

interface Props {
  isOpen: boolean
}

withDefaults(defineProps<Props>(), {
  isOpen: false
});

const slots = useSlots();

const emit = defineEmits(['close']);
</script>

<style lang="scss" scoped>
.blackout, .modal {
  @apply fixed inset-0;
}

.blackout {
  @apply bg-black/70;
}

.modal {
  @apply text-gray-100;
  @apply rounded-lg;
  @apply border border-slate-300 dark:border-slate-700;
  @apply bg-gray-200 dark:bg-gray-900;
  @apply flex flex-col gap-8;
  @apply container max-w-sm;

  &__header {
    @apply flex flex-row justify-between items-center;
  }
}
</style>