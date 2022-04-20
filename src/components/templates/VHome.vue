<template>
  <div class="home">
    <draggable
      class="home__widgets"
      ghost-class="widget--ghost"
      animation=200
      item-key="name"
      v-model="widgets"
      :disabled="false"
      @change="onChange(($event as any).moved)"
    >
      <template #item="{ element }">
        <component :is="element.component" v-if="element.enabled" />
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'

defineProps({
  widgets: Array
})

const emit = defineEmits([
  'change'
])

const onChange = (e: any) => {
  emit('change', e)
}
</script>

<style lang="scss" scoped>
.home {
  @apply container flex flex-col grow;

  &__widgets {
    @apply flex flex-col grow gap-8 justify-center items-center;
  }
}
</style>