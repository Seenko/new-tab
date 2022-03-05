<template>
  <button class="button">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.button {
  @apply bg-white;
  @apply dark:bg-gray-900;

  @apply block rounded drop-shadow dark:drop-shadow-none p-2 transition;

  &:hover {
    @apply scale-105;
  }

  &:active {
    @apply scale-100;
  }
}
</style>