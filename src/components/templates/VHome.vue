<template>
  <div class="home">
    <div
      v-for="(_, row) in widgets"
      class="home__grid"
    >
      <draggable
        v-for="(_, column) in widgets[row]"
        :class="['widgets', { 'widgets--editing': isEditingWidgets }]"
        ghost-class="widget--ghost"
        animation=200
        item-key="name"
        group="widgets"
        :list="getWidgetsForCell(row, column)"
        :disabled="!isEditingWidgets"
        @change="onChange(row, column, ($event as any))"
      >
        <template #item="{ element }">
          <component :is="getComponentForWidget(element)" :is-editable="true" />
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, markRaw } from 'vue'
import draggable from 'vuedraggable'

import { WidgetsGridChange, Widget } from '@/types/widgetsGrid'

import GreetingWidget from '@/widgets/GreetingWidget.vue'
import ClockWidget from '@/widgets/ClockWidget.vue'
import QuickAccessWidget from '@/widgets/QuickAccessWidget.vue'
import NewsWidget from '@/widgets/NewsWidget.vue'
import WeatherWidget from '@/widgets/WeatherWidget.vue'


const props = defineProps({
  widgets: {
    type: Array as PropType<Array<Array<Array<Widget>>>>,
    required: true
  },
  isEditingWidgets: Boolean
})

const getWidgetsForCell = (row: number, column: number): Array<Widget> => {
  return JSON.parse(JSON.stringify(props.widgets[row][column]))
}

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

const emit = defineEmits([
  'change'
])

const onChange = (row: number, column: number, action: any) => {
  emit('change', {
    row,
    column,
    action
  } as WidgetsGridChange)
}
</script>

<style lang="scss" scoped>
.home {
  @apply flex flex-row grow;

  &__grid {
    @apply flex flex-col grow;
  }

  .widgets {
    @apply flex flex-col grow gap-8 justify-center items-center;

    &--editing {
      @apply border-2 border-dotted border-white/50 rounded-md;
    }
  }
}
</style>