<template>
  <draggable
    v-model="list"
    tag="ul"
    class="flex flex-col gap-2"
    handle=".handle"
    item-key="name"
  >
    <template #item="{ element }">
      <li class="flex flex-row justify-between grow gap-2">
        <div v-if="slots.item">
          <slot
            name="item"
            :data="element"
          />
        </div>
        <HamburgerIcon class="handle cursor-ns-resize" />
      </li>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import draggable from 'vuedraggable';

import { unreactify } from '@/utils/reactivity';

import HamburgerIcon from '@/assets/icons/hamburger.svg';

interface Props {
  modelValue?: Array<unknown>;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ([])
});

const slots = useSlots();

const emit = defineEmits(['update:modelValue']);

const list = computed({ 
  get: () => unreactify(props.modelValue), 
  set: (value: Array<unknown>) => emit('update:modelValue', value) 
});
</script>