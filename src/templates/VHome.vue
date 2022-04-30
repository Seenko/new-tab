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
          animation=200
          item-key="name"
          group="widgets"
          :list="unreactify(data)"
          :disabled="!isEditingWidgets"
          @change="onChange({ row, column, action: $event })"
        >
          <template #item="{ element }">
            <component :is="getComponentForWidget(element)" :is-editable="true" />
          </template>
        </draggable>
      </template>
    </v-editable-grid>
    <div
      v-if="isEditingWidgets"
      :class="['home__tray', { 'home__tray--open': isEditingWidgets }]"
    >
      <draggable
        class="tray__widgets"
        ghost-class="widget--ghost"
        animation=200
        item-key="name"
        :group="{ name: 'widgets', pull: 'clone', put: false }"
        :list="getWidgetsTrayData()"
        :disabled="!isEditingWidgets"
      >
        <template #item="{ element }">
          <p class="cursor-pointer">{{ element.name.substr(0, element.name.length - 6) }}</p>
        </template>
      </draggable>

      <draggable
        class="tray__trash"
        ghost-class="widget--ghost"
        animation=200
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
import type { Widget, WidgetsGridChange } from '@/types/widgetsGrid'
import type { GridAdd, GridRemove } from '@/types/grid'

import { unreactify } from '@/utils/reactivity'
import { PropType, markRaw } from 'vue'
import draggable from 'vuedraggable'

import VEditableGrid from '@/components/molecules/VEditableGrid.vue'

import GreetingWidget from '@/widgets/GreetingWidget.vue'
import ClockWidget from '@/widgets/ClockWidget.vue'
import QuickAccessWidget from '@/widgets/QuickAccessWidget.vue'
import NewsWidget from '@/widgets/NewsWidget.vue'
import WeatherWidget from '@/widgets/WeatherWidget.vue'

import TrashIcon from '@/assets/icons/trash.svg'

defineProps({
  widgets: {
    type: Array as PropType<Array<Array<Array<Widget>>>>,
    required: true
  },
  isEditingWidgets: Boolean
})

const getComponentForWidget = (element: Widget) => {
  const widgets = {
    GreetingWidget,
    ClockWidget,
    QuickAccessWidget,
    NewsWidget,
    WeatherWidget
  }

  return (element && element.name) ? markRaw((widgets as any)[element.name]) : null
}

const getWidgetsTrayData = (): Array<Widget> => {
  return unreactify([
    { name: 'GreetingWidget' },
    { name: 'ClockWidget' },
    { name: 'QuickAccessWidget' },
    { name: 'NewsWidget' },
    { name: 'WeatherWidget' }
  ])
}

const emit = defineEmits([ 'change', 'addNewCell', 'removeCell' ])

const onChange = (widgetsGridChange: WidgetsGridChange) => emit('change', widgetsGridChange)
const onGridAdd = (newCell: GridAdd) => emit('addNewCell', newCell)
const onGridRemove = (removeCell: GridRemove) => emit('removeCell', removeCell)
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
        @apply flex flex-col grow justify-center items-center gap-4;
      }

      &__trash {
        @apply bg-red-500/75 h-24 py-2 overflow-hidden;
        @apply flex flex-col justify-center items-center;
        @apply fill-white;

        & > ::v-deep(.widget--ghost) {
          @apply hidden;
        }
      }
    }
  }
}
</style>