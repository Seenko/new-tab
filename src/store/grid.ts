import type { Widget, WidgetsGridChange, WidgetsGridChangeAdded, WidgetsGridChangeMoved, WidgetsGridChangeRemoved } from '@/types/widgetsGrid'
import type { GridAdd, GridRemove } from '@/types/grid'

import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { moveToArrayIndex } from '@/utils/array'

const defaultGrid: Array<Array<Array<Widget>>> = [[[
    {
      name: 'GreetingWidget'
    },
    {
      name: 'ClockWidget'
    },
    {
      name: 'QuickAccessWidget'
    },
    {
      name: 'NewsWidget'
    },
    {
      name: 'WeatherWidget'
    }
]]]

export const useGridStore = defineStore({
  id: 'grid',
  state: () => ({
    data: useStorage('grid', defaultGrid)
  }),
  actions: {
    updateWidgetsPosition(change: WidgetsGridChange): Array<Array<Array<Widget>>> {
      switch (Object.keys(change.action)[0]) {
        case 'moved':
          const movedAction = (change.action as WidgetsGridChangeMoved).moved
          moveToArrayIndex(this.data[change.row][change.column], movedAction.oldIndex, movedAction.newIndex)
          break;
        case 'added':
          const addedAction = (change.action as WidgetsGridChangeAdded).added
          this.data[change.row][change.column].splice(addedAction.newIndex, 0, addedAction.element);
          break;
        case 'removed':
          const removedAction = (change.action as WidgetsGridChangeRemoved).removed
          this.data[change.row][change.column].splice(removedAction.oldIndex, 1);
          break;
      }

      return this.data
    },
    addNewWidgetsCell(newCell: GridAdd) {
      if (newCell.direction > 0) {
        if (newCell.column === null) {
          this.data.splice(newCell.row, 0, [[]]);
        } else {
          this.data[newCell.row].splice(newCell.column + 1, 0, []);
        }
      } else if (newCell.direction < 0) {
        if (newCell.column === null) {
          this.data.splice(newCell.row + 1, 0, [[]]);
        } else {
          this.data[newCell.row].splice(newCell.column, 0, []);
        }
      }
    },
    removeWidgetsCell(removeCell: GridRemove) {
      if (this.data.length === 1 && this.data[0].length === 1) return

      if (removeCell.column === null) {
        this.data.splice(removeCell.row, 1);
      } else {
        this.data[removeCell.row].splice(removeCell.column, 1);

        if (this.data[removeCell.row].length === 0) {
          this.data.splice(removeCell.row, 1);
        }
      }
    }
  },
})