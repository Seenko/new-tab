<template>
  <button class="suggestion">
    <span class="suggestion__name">
      {{ name }}
    </span>
    <small
      v-if="extra"
      class="suggestion__extra"
    >
      {{ extra }}
    </small>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  name: string;
  city?: string;
  state?: string;
  country?: string;
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  city: '',
  state: '',
  country: ''
});

const extra = computed(() => {
  const extraArray = [];
  if (props.state) extraArray.push(props.state);
  if (props.country) extraArray.push(props.country);

  return extraArray.join(' - ');
});
</script>

<style lang="scss" scoped>
.suggestion {
  @apply flex items-baseline gap-2;
  @apply p-2 rounded text-left;
  @apply border border-gray-700;

  &__name {
    @apply font-semibold;
  }
}
</style>