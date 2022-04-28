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
          :list="getImmutableData(data)"
          :disabled="!isEditingWidgets"
          @change="onChange(row, column, ($event as any))"
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
          <p class="cursor-pointer">{{ element.name }}</p>
        </template>
      </draggable>

      <draggable
        class="tray__trash"
        ghost-class="widget--ghost"
        animation=200
        item-key="name"
        :group="{ name: 'widgets', put: true }"
        :list="getTrashTrayData()"
        :disabled="!isEditingWidgets"
      >
        <template #header>
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2zm-7-10.414l3.293-3.293 1.414 1.414-3.293 3.293 3.293 3.293-1.414 1.414-3.293-3.293-3.293 3.293-1.414-1.414 3.293-3.293-3.293-3.293 1.414-1.414 3.293 3.293zm10-8.586h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-8-3h-4v1h4v-1z"/></svg>
        </template>
        <template #item />
      </draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, markRaw } from 'vue'
import draggable from 'vuedraggable'

import { WidgetsGridChange, Widget, WidgetsGridChangeAdded, WidgetsGridChangeMoved, WidgetsGridChangeRemoved } from '@/types/widgetsGrid'
import { GridAdd, GridRemove } from '@/types/grid'

import VEditableGrid from '@/components/molecules/VEditableGrid.vue'
import GreetingWidget from '@/widgets/GreetingWidget.vue'
import ClockWidget from '@/widgets/ClockWidget.vue'
import QuickAccessWidget from '@/widgets/QuickAccessWidget.vue'
import NewsWidget from '@/widgets/NewsWidget.vue'
import WeatherWidget from '@/widgets/WeatherWidget.vue'


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
  return JSON.parse(JSON.stringify([
    { name: 'GreetingWidget' },
    { name: 'ClockWidget' },
    { name: 'QuickAccessWidget' },
    { name: 'NewsWidget' },
    { name: 'WeatherWidget' }
  ]))
}

const getTrashTrayData = (): Array<Widget> => {
  return JSON.parse(JSON.stringify([]))
}

const getImmutableData = (data: any): any => {
  return JSON.parse(JSON.stringify(data))
}

const emit = defineEmits([
  'change',
  'addNewCell',
  'removeCell'
])

const onChange = (row: number, column: number, action: WidgetsGridChangeMoved | WidgetsGridChangeAdded | WidgetsGridChangeRemoved) => {
  emit('change', {
    row,
    column,
    action
  } as WidgetsGridChange)
}

const onGridAdd = (newCell: GridAdd) => {
  emit('addNewCell', newCell)
}

const onGridRemove = (removeCell: GridRemove) => {
  emit('removeCell', removeCell)
}
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