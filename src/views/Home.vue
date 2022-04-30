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
import { WidgetsGridChange } from '@/types/widgetsGrid'
import { GridAdd, GridRemove } from '@/types/grid'

import { useApplicationStore } from '@/store/application'
import { useGridStore } from '@/store/grid'

import VMainLayout from '@/layouts/VMainLayout.vue'
import VHome from '@/templates/VHome.vue'

const application = useApplicationStore()
const grid = useGridStore()

const onChange = (change: WidgetsGridChange) => grid.updateWidgetsPosition(change)
const onAddNewCell = (newCell: GridAdd) => grid.addNewWidgetsCell(newCell)
const onRemoveCell = (removeCell: GridRemove) => grid.removeWidgetsCell(removeCell)
</script>