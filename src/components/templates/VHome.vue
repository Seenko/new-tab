<template>
  <div class="home">
    <div :class="['grid', { 'grid--editing': isEditingWidgets }]">
      <div
        v-for="(_, row) in widgets"
        class="grid__row"
      >
        <button
          v-if="(row == 0 || row == widgets.length) && isEditingWidgets"
          class="grid__add"
          @click="addNewCell({row, column: null, direction: 1})"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/></svg>
        </button>
        <div class="content">
          <div
            v-for="(_, column) in widgets[row]"
            class="grid__column"
          >
            <button
              v-if="(column == 0 || column == widgets[row].length) && isEditingWidgets"
              class="grid__add"
              @click="addNewCell({row, column, direction: -1})"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/></svg>
            </button>
            <div class="content">
              <draggable
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
              <button
                v-if="isEditingWidgets && canRemoveCell(row, column)"
                class="grid__remove grid__remove--column"
                @click="removeCell({row, column})"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-12v-2h12v2z"/></svg>
              </button>
            </div>
            <button
              v-if="isEditingWidgets"
              class="grid__add"
              @click="addNewCell({row, column, direction: 1})"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/></svg>
            </button>
          </div>
        </div>
        <button
          v-if="isEditingWidgets"
          class="grid__add"
          @click="addNewCell({row, column: null, direction: -1})"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/></svg>
        </button>
        <button
          v-if="isEditingWidgets && canRemoveCell(row, 0)"
          class="grid__remove grid__remove--row"
          @click="removeCell({row, column: null})"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-12v-2h12v2z"/></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, markRaw } from 'vue'
import draggable from 'vuedraggable'

import { WidgetsGridChange, Widget, WidgetsGridAddNewCell, WidgetsGridChangeAdded, WidgetsGridChangeMoved, WidgetsGridChangeRemoved, WidgetsGridRemoveCell } from '@/types/widgetsGrid'

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

const canRemoveCell = (row: number, column: number) => {
  return (getWidgetsForCell(row, column).length === 0)
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

const addNewCell = (newCell: WidgetsGridAddNewCell) => {
  emit('addNewCell', newCell)
}

const removeCell = (removeCell: WidgetsGridRemoveCell) => {
  emit('removeCell', removeCell)
}
</script>

<style lang="scss" scoped>
.home {
  @apply flex flex-row grow;

  .grid {
    @apply flex flex-col grow;

    &__row, &__column {
      @apply flex relative grow;

      .content {
        @apply flex justify-center items-stretch grow;
      }
    }
    
    &__row {
      @apply flex-col;

      .content {
        @apply flex-row;
      }
    }

    &__column {
      @apply flex-row;

      .content {
        @apply flex-col relative;
      }
    }

    &--editing {
      .grid {
        &__row, &__column {
          button {
            &.grid__add {
              @apply flex justify-center items-center;
              @apply bg-gray-400 dark:bg-gray-700 fill-gray-300 dark:fill-gray-500 p-1 m-2 rounded-full;
            }

            &.grid__remove {
              @apply absolute fill-red-500;

              &--row {
                @apply -right-2 top-0 bottom-0 hidden;
              }

              &--column {
                @apply -right-2 -top-2;
              }
            }
          }
        }

        &__column {
          .content {
            @apply border-2 border-dotted border-gray-800/50 dark:border-gray-200/50 rounded-md p-2;
          }
        }
      }
    }
  }

  .widgets {
    @apply flex flex-col grow gap-8 justify-center items-center;
  }
}
</style>