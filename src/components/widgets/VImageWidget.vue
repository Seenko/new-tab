<template>
  <img
    :src="src"
    alt=""
  >
</template>

<script setup lang="ts">
interface Props {
  src: string;
}

withDefaults(defineProps<Props>(), {
  src: ''
});
</script>