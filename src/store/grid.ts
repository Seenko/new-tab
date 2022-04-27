import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { Widget, WidgetsGridChange, WidgetsGridChangeAdded, WidgetsGridChangeMoved, WidgetsGridChangeRemoved } from '@/types/widgetsGrid'
import { GridAdd, GridRemove } from '@/types/grid'
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
          // console.log(`Adding new row above row ${newCell.row}`)
          this.data.splice(newCell.row, 0, [[]]);
        } else {
          // console.log(`Adding new column on the right of column ${newCell.column} in row ${newCell.row}`)
          this.data[newCell.row].splice(newCell.column + 1, 0, []);
        }
      } else if (newCell.direction < 0) {
        if (newCell.column === null) {
          // console.log(`Adding new row below row ${newCell.row}`)
          this.data.splice(newCell.row + 1, 0, [[]]);
        } else {
          // console.log(`Adding new column on the left of column ${newCell.column} in row ${newCell.row}`)
          this.data[newCell.row].splice(newCell.column, 0, []);
        }
      }
    },
    removeWidgetsCell(removeCell: GridRemove) {
      if (this.data.length === 1 && this.data[0].length === 1) return

      if (removeCell.column === null) {
        // console.log(`Removing row ${removeCell.row}`)
        this.data.splice(removeCell.row, 1);
      } else {
        // console.log(`Removing column ${removeCell.column} in row ${removeCell.row}`)
        this.data[removeCell.row].splice(removeCell.column, 1);

        if (this.data[removeCell.row].length === 0) {
          // console.log(`Row is now empty, therefore, removing row ${removeCell.row}`)
          this.data.splice(removeCell.row, 1);
        }
      }
    }
  },
})