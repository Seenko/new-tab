<template>
  <details>
    <summary>
      <slot name="summary" />
    </summary>
    <slot />
  </details>
</template>

<style lang="scss" scoped>
summary {
  @apply cursor-pointer;
}
</style>