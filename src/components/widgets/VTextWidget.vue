<template>
  <component
    :is="tag"
    :class="`font-${textStyle}`"
  >
    {{ textString }}
  </component>
</template>

<script setup lang="ts">
interface Props {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'small';
  textStyle?: 'serif' | 'sans' | 'mono';
  textString: string;
}

withDefaults(defineProps<Props>(), {
  tag: 'h1',
  textStyle: 'serif',
  textString: ''
});
</script>