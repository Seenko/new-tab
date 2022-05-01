<template>
  <div
    :class="['lattice', { 'lattice--editing': isEditing }]"
    :style="{
      gridTemplateRows: `repeat(${data.length}, auto)`,
    }"
  >
    <div
      v-for="(_, row) in data"
      :key="row"
      class="lattice__row"
    >
      <v-button
        v-if="(row == 0 || row == data.length) && isEditing"
        class="lattice__add"
        variant="icon"
        :animated="false"
        @click="gridAdd({row, column: null, direction: 1})"
      >
        <AddIcon />
      </v-button>
      <div
        class="lattice__wrapper"
        :style="{
          gridTemplateColumns: `repeat(${data[row].length}, auto)`
        }"
      >
        <div
          v-for="(__, column) in data[row]"
          :key="column"
          class="lattice__column"
        >
          <v-button
            v-if="(column == 0 || column == data[row].length) && isEditing"
            class="lattice__add"
            variant="icon"
            :animated="false"
            @click="gridAdd({row, column, direction: -1})"
          >
            <AddIcon />
          </v-button>
          <div class="lattice__content">
            <slot
              name="content"
              :row="row"
              :column="column"
              :data="data[row][column]"
            />
          </div>
          <v-button
            v-if="isEditing && canRemoveCell(row)"
            class="lattice__remove lattice__remove--column"
            variant="icon"
            @click="gridRemove({row, column})"
          >
            <RemoveIcon />
          </v-button>
          <v-button
            v-if="isEditing"
            class="lattice__add"
            variant="icon"
            :animated="false"
            @click="gridAdd({row, column, direction: 1})"
          >
            <AddIcon />
          </v-button>
        </div>
      </div>
      <v-button
        v-if="isEditing"
        class="lattice__add"
        variant="icon"
        :animated="false"
        @click="gridAdd({row, column: null, direction: -1})"
      >
        <AddIcon />
      </v-button>
      <!-- <v-button
        v-if="isEditing && canRemoveRow(row)"
        class="lattice__remove lattice__remove--row"
        variant="icon"
        @click="gridRemove({row, column: null})"
      >
        <RemoveIcon />
      </v-button> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GridArray, GridAdd, GridRemove } from '@/types/grid'

import { PropType } from 'vue'

import VButton from '@/components/atoms/VButton.vue'

import AddIcon from '@/assets/icons/add.svg'
import RemoveIcon from '@/assets/icons/remove.svg'

const props = defineProps({
  data: {
    type: Array as PropType<GridArray>,
    required: true
  },
  isEditing: Boolean
})

const canRemoveCell = (row: number) => {
  return props.data.length > 1 || props.data[row].length > 1
}

// const canRemoveRow = (row: number) => {
//   return props.data.length > 1
// }

const emit = defineEmits([
  'gridAdd',
  'gridRemove'
])

const gridAdd = (data: GridAdd) => emit('gridAdd', data)
const gridRemove = (data: GridRemove) => emit('gridRemove', data)
</script>

<style lang="scss" scoped>
.lattice {
  @apply grid grow;

  &__row, &__column {
    @apply flex relative grow min-h-0 min-w-0;
  }
  
  &__row {
    @apply flex-col min-h-0;

    .lattice__wrapper {
      @apply grid grow min-h-0 min-w-0;
    }
  }

  &__column {
    @apply flex-row;

    .lattice__content {
      @apply min-h-0 min-w-0 overflow-auto;
      @apply flex flex-col grow;
    }
  }

  &--editing {
    .lattice {
      &__row, &__column {
        .lattice__add {
          @apply flex justify-center items-center;
          @apply bg-gray-400 dark:bg-gray-700 fill-gray-300 dark:fill-gray-500 p-1 m-2 rounded-full;
        }

        .lattice__remove {
          @apply absolute;
          @apply fill-red-500 bg-gray-200 dark:bg-gray-900 rounded-full p-0;

          &--row {
            // @apply hidden;
            @apply -right-2;
          }

          &--column {
            @apply right-9 -top-2;
          }
        }
      }

      &__row {
        & > .lattice__add {
          @apply mx-14;
        }
      }

      &__column {
        .lattice__content {
          @apply border-2 border-dotted border-gray-800/50 dark:border-gray-200/50 rounded-md p-2;
        }
      }
    }
  }
}
</style>