<template>
  <div
    :class="['lattice', { 'lattice--editing': isEditing }]"
    :style="{
      gridTemplateRows: `repeat(${data.length}, 1fr)`,
    }"
  >
    <div
      v-for="(_, row) in data"
      class="lattice__row"
    >
      <v-button
        v-if="(row == 0 || row == data.length) && isEditing"
        class="lattice__add"
        variant="icon"
        :animated="false"
        @click="gridAdd({row, column: null, direction: 1})"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/></svg>
      </v-button>
      <div
        class="lattice__wrapper"
        :style="{
          gridTemplateColumns: `repeat(${data[row].length}, 1fr)`
        }"
      >
        <div
          v-for="(_, column) in data[row]"
          class="lattice__column"
        >
          <v-button
            v-if="(column == 0 || column == data[row].length) && isEditing"
            class="lattice__add"
            variant="icon"
            :animated="false"
            @click="gridAdd({row, column, direction: -1})"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/></svg>
          </v-button>
          <div class="lattice__content">
            <slot name="content" :row="row" :column="column" :data="data[row][column]" />
          </div>
          <v-button
            v-if="isEditing && canRemoveCell(row, column)"
            class="lattice__remove lattice__remove--column"
            variant="icon"
            @click="gridRemove({row, column})"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-12v-2h12v2z"/></svg>
          </v-button>
          <v-button
            v-if="isEditing"
            class="lattice__add"
            variant="icon"
            :animated="false"
            @click="gridAdd({row, column, direction: 1})"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/></svg>
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
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/></svg>
      </v-button>
      <!-- <v-button
        v-if="isEditing && canRemoveRow(row)"
        class="lattice__remove lattice__remove--row"
        variant="icon"
        @click="gridRemove({row, column: null})"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-12v-2h12v2z"/></svg>
      </v-button> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { GridAdd, GridRemove } from '@/types/grid'

import VButton from '@/components/atoms/VButton.vue'

const props = defineProps({
  data: {
    type: Array as PropType<Array<Array<any>>>,
    required: true
  },
  isEditing: Boolean
})

const emit = defineEmits([
  'gridAdd',
  'gridRemove'
])

const canRemoveCell = (row: number, column: number) => {
  return props.data.length > 1 || props.data[row].length > 1
}

const canRemoveRow = (row: number) => {
  return props.data.length > 1
}

const gridAdd = (data: GridAdd) => {
  emit('gridAdd', data)
}

const gridRemove = (data: GridRemove) => {
  emit('gridRemove', data)
}
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