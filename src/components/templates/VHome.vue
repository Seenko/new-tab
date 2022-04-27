<template>
  <div class="home">
    <v-editable-grid
      class="home__grid"
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
  }

  &__widgets {
    @apply flex flex-col grow gap-8 justify-center items-center;
  }
}
</style>