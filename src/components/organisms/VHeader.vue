<template>
  <header>
    <div>
      <slot />
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  @apply flex flex-row justify-between items-center gap-1 p-4;
}
</style>