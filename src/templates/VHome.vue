<template>
  <div class="home">
    <v-editable-grid
      class="home__grid"
      :class="['home__grid', { 'home__grid--editing': isEditingWidgets }]"
      :is-editing="isEditingWidgets"
      :data="widgets"
      @grid-add="onGridAdd($event)"
      @grid-remove="onGridRemove($event)"
    >
      <template #content="{ row, column, data }">
        <draggable
          :class="['home__widgets', { 'home__widgets--editing': isEditingWidgets }]"
          ghost-class="widget--ghost"
          animation="200"
          item-key="name"
          group="widgets"
          :list="unreactify(data)"
          :disabled="!isEditingWidgets"
          @change="onChange({ row, column, action: $event })"
        >
          <template #item="{ element, index }">
            <component
              :is="getComponentForWidget(element)"
              :is-editable="true"
              :widget="element"
              :mismatching-signature="!checkIfWidgetSignatureMatches(element)"
              @set-setting="onSetSetting({ row, column, index, setting: $event })"
            />
          </template>
        </draggable>
      </template>
    </v-editable-grid>
    <div
      v-if="isEditingWidgets"
      :class="['home__tray', { 'home__tray--open': isEditingWidgets }]"
    >
      <v-text-input
        v-model="widgetSearchQuery"
        class="tray__search"
        placeholder="Search widgets..."
      />
      <draggable
        class="tray__widgets"
        ghost-class="widget--ghost"
        animation="200"
        item-key="name"
        :group="{ name: 'widgets', pull: 'clone', put: false }"
        :sort="false"
        :list="availableWidgets"
        :disabled="!isEditingWidgets"
      >
        <template #header>
          <div
            v-if="availableWidgets.length == 0"
            class="tray__nothing"
          >
            <p>No widgets found!</p>
            <FrownSmileyIcon />
          </div>
        </template>
        <template #item="{ element }">
          <p class="cursor-pointer">
            {{ (element as Widget).name }}
          </p>
        </template>
      </draggable>

      <draggable
        class="tray__trash"
        ghost-class="widget--ghost"
        animation="200"
        item-key="name"
        :group="{ name: 'widgets', put: true }"
        :list="unreactify([])"
        :disabled="!isEditingWidgets"
      >
        <template #header>
          <TrashIcon />
        </template>
        <template #item />
      </draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Widget, WidgetSettingUpdate, WidgetsGrid, WidgetsGridChange } from '@/types/widgetsGrid';
import type { GridAdd, GridRemove } from '@/types/grid';

import { widgetsComponents, registeredWidgets } from '@/widgets/registry';

import { unreactify } from '@/utils/reactivity';
import { ref, watch, computed, PropType, markRaw } from 'vue';
import draggable from 'vuedraggable';

import VEditableGrid from '@/components/molecules/VEditableGrid.vue';
import VTextInput from '@/components/atoms/VTextInput.vue';

import TrashIcon from '@/assets/icons/trash.svg';
import FrownSmileyIcon from '@/assets/icons/smiley/frown.svg';

const props = defineProps({
  widgets: {
    type: Array as PropType<WidgetsGrid>,
    required: true
  },
  isEditingWidgets: Boolean
});

const widgetSearchQuery = ref<string>('');

const getComponentForWidget = (widget: Widget) => markRaw(widgetsComponents[widget.id]);

const checkIfWidgetSignatureMatches = (widget: Widget) => {
  if (widget.signature) {
    const matchingRegisteredWidget = availableWidgets.value.find((availableWidget: Widget) => availableWidget.id === widget.id);
    if (matchingRegisteredWidget && (matchingRegisteredWidget.signature === widget.signature)) return true;
  }

  return false;
};

const availableWidgets = computed(() => {
  const widgets: Array<Widget> = unreactify(registeredWidgets);

  if (!widgetSearchQuery.value) return widgets;

  return widgets.filter(widget => widget.name.toLowerCase().includes(widgetSearchQuery.value.toLowerCase()));
});

watch(() => props.isEditingWidgets, async (to) => {
  if (to === false) widgetSearchQuery.value = '';
});

const emit = defineEmits([ 'change', 'addNewCell', 'removeCell', 'widgetSettingUpdate' ]);

const onChange = (widgetsGridChange: WidgetsGridChange) => emit('change', widgetsGridChange);
const onGridAdd = (newCell: GridAdd) => emit('addNewCell', newCell);
const onGridRemove = (removeCell: GridRemove) => emit('removeCell', removeCell);
const onSetSetting = (widgetSettingUpdate: WidgetSettingUpdate) => emit('widgetSettingUpdate', widgetSettingUpdate);
</script>

<style lang="scss" scoped>
.home {
  @apply flex flex-row grow h-0;

  &__grid {
    @apply max-h-full;

    &--editing {
      @apply bg-gray-200/75 dark:bg-gray-900/75;
      @apply mx-2 rounded-xl shadow;
    }
  }

  &__widgets {
    @apply flex flex-col grow gap-8 justify-center items-center;
  }

  &__tray {
    @apply bg-gray-200/75 dark:bg-gray-900/75 rounded-l-xl shadow overflow-hidden;
    @apply flex flex-col justify-between max-w-xs w-full;

    .tray {
      &__widgets {
        @apply overflow-auto;
        @apply flex flex-col grow items-center gap-4 py-2 overflow-auto;
      }

      &__search {
        @apply rounded-tl-xl rounded-b-none rounded-r-none;
      }

      &__nothing {
        @apply flex flex-col justify-center items-center text-2xl gap-6;
        @apply text-gray-500 dark:text-gray-400;

        svg {
          @apply w-24 h-24;
          @apply fill-gray-500 dark:fill-gray-400;
        }
      }

      &__trash {
        @apply bg-red-500/75 h-24 py-2 overflow-hidden;
        @apply flex flex-col shrink-0 justify-center items-center;
        @apply fill-white;

        & > ::v-deep(.widget--ghost) {
          @apply hidden;
        }
      }
    }
  }
}
</style>