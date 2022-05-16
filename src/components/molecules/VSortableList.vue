<template>
  <draggable
    v-model="list"
    class="sortable"
    tag="ul"
    handle=".handle"
    animation="200"
    :item-key="itemKey"
  >
    <template #header>
      <div
        v-if="list.length == 0"
        class="sortable__empty"
      >
        <slot name="empty" />
      </div>
    </template>
    <template #item="{ element }">
      <li class="flex flex-row items-center justify-between grow gap-2">
        <slot
          name="item"
          :data="element"
        />
        <HamburgerIcon class="handle cursor-ns-resize" />
      </li>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import draggable from 'vuedraggable';

import { unreactify } from '@/utils/reactivity';

import HamburgerIcon from '@/assets/icons/hamburger.svg';

interface Props {
  itemKey: string,
  modelValue?: Array<unknown>;
}

const props = withDefaults(defineProps<Props>(), {
  itemKey: '',
  modelValue: () => ([])
});

const emit = defineEmits(['update:modelValue']);

const list = computed({ 
  get: () => unreactify(props.modelValue), 
  set: (value: Array<unknown>) => emit('update:modelValue', value) 
});
</script>

<style lang="scss" scoped>
.sortable {
  @apply flex flex-col gap-2;
}
</style>