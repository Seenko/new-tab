<template>
  <v-main-layout>
    <v-home
      :widgets="grid.data"
      :is-editing-widgets="application.isEditingWidgets"
      @change="onChange($event)"
      @add-new-cell="onAddNewCell($event)"
      @remove-cell="onRemoveCell($event)"
    />
  </v-main-layout>
</template>

<script setup lang="ts">
import { WidgetsGridChange, WidgetsGridAddNewCell, WidgetsGridRemoveCell } from '@/types/widgetsGrid'

import { useApplicationStore } from '@/store/application'
import { useGridStore } from '@/store/grid'

import VMainLayout from '@/components/layouts/VMainLayout.vue'
import VHome from '@/components/templates/VHome.vue'

const application = useApplicationStore()
const grid = useGridStore()

const onChange = (change: WidgetsGridChange) => grid.updateWidgetsPosition(change)
const onAddNewCell = (newCell: WidgetsGridAddNewCell) => grid.addNewWidgetsCell(newCell)
const onRemoveCell = (removeCell: WidgetsGridRemoveCell) => grid.removeWidgetsCell(removeCell)
</script>