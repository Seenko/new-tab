import type { WidgetSettingUpdate, WidgetsGrid, WidgetsGridChange, WigetSettingValue } from '@/types/widgetsGrid';
import type { GridAdd, GridRemove } from '@/types/grid';

import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { moveToArrayIndex } from '@/utils/array';
import { unreactify } from '@/utils/reactivity';

import { defaultWidgets } from '@/widgets/registry';

const defaultGrid: WidgetsGrid = [[[ ...defaultWidgets ]]];

export const useGridStore = defineStore({
  id: 'grid',
  state: () => ({
    data: useStorage('grid', defaultGrid)
  }),
  actions: {
    updateWidgetsPosition(change: WidgetsGridChange): WidgetsGrid {
      const widgetsList = this.data[change.row][change.column];

      if (change.action.moved) {
        moveToArrayIndex(widgetsList, change.action.moved.oldIndex, change.action.moved.newIndex);
      } else if (change.action.added) {
        widgetsList.splice(change.action.added.newIndex, 0, unreactify(change.action.added.element));
      } else if (change.action.removed) {
        widgetsList.splice(change.action.removed.oldIndex, 1);
      }

      return this.data;
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
      if (this.data.length === 1 && this.data[0].length === 1) return;

      if (removeCell.column === null) {
        this.data.splice(removeCell.row, 1);
      } else {
        this.data[removeCell.row].splice(removeCell.column, 1);

        if (this.data[removeCell.row].length === 0) {
          this.data.splice(removeCell.row, 1);
        }
      }
    },
    updateWidgetSetting(widgetSettingUpdate: WidgetSettingUpdate) {
      const widget = this.data[widgetSettingUpdate.row][widgetSettingUpdate.column][widgetSettingUpdate.index];

      if (widget.settings) {
        const settingToUpdate = widget.settings.find(setting => setting.id === widgetSettingUpdate.setting.id);

        if (settingToUpdate) {
          settingToUpdate.value = (widgetSettingUpdate.setting.value as WigetSettingValue | boolean | string | number);
        }
      }
    }
  }
});