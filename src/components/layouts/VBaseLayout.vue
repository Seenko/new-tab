<template>
  <div class="layout">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.layout {
  @apply min-h-screen flex flex-col overflow-hidden;
  @apply bg-no-repeat	bg-center	bg-cover;
}
</style>