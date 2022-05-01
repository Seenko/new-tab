<template>
  <details
    ref="detailsElement"
    class="accordion"
  >
    <summary
      ref="summaryElement"
      class="accordion__title"
      @click.prevent="onClick"
    >
      <slot name="summary" />
    </summary>
    <div
      ref="contentElement"
      class="accordion__content"
    >
      <slot name="content" />
    </div>
  </details>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const animationSpeedInMs = 150

const detailsElement = ref()
const summaryElement = ref()
const contentElement = ref()

const isClosing = ref(false)
const isOpening = ref(false)
const isExpanding = ref(false)

const currentAnimation = ref()

const onClick = () => { 
  detailsElement.value.style.overflow = 'hidden'

  if (isClosing.value || !detailsElement.value.open) {
    doOpen()
  } else if (isOpening.value || detailsElement.value.open) {
    doClose()
  }
}

const onAnimationFinish = (isOpen: boolean) => {
  detailsElement.value.open = isOpen
  currentAnimation.value = null
  isClosing.value = false
  isExpanding.value = false
  detailsElement.value.style.height = detailsElement.value.style.overflow = ''
}

const doOpen = () => {
  detailsElement.value.style.height = `${detailsElement.value.offsetHeight}px`

  detailsElement.value.open = true
  window.requestAnimationFrame(() => doExpand())
}

const doExpand = () => {
  isExpanding.value = true

  const startHeight = `${detailsElement.value.offsetHeight}px`
  const endHeight = `${detailsElement.value.offsetHeight + getFullElementHeight(contentElement.value)}px`

  if (currentAnimation.value) {
    currentAnimation.value.cancel()
  }

  currentAnimation.value = detailsElement.value.animate(
    { height: [startHeight, endHeight] },
    { duration: animationSpeedInMs, easing: 'ease-out' }
  )

  currentAnimation.value.onfinish = () => onAnimationFinish(true)
  currentAnimation.value.oncancel = () => isExpanding.value = false
}

const doClose = () => {
  isClosing.value = true

  const startHeight = `${detailsElement.value.offsetHeight}px`
  const endHeight = `${getFullElementHeight(detailsElement.value) - getFullElementHeight(contentElement.value)}px`

  if (currentAnimation.value) {
    currentAnimation.value.cancel()
  }

  currentAnimation.value = detailsElement.value.animate(
    { height: [startHeight, endHeight] },
    { duration: animationSpeedInMs, easing: 'ease-out' }
  )

  currentAnimation.value.onfinish = () => onAnimationFinish(false)
  currentAnimation.value.oncancel = () => isClosing.value = false
}

const getFullElementHeight = (element: HTMLElement) => {
  const elementComputedStyle = getComputedStyle(element)
  return element.offsetHeight +
          parseInt(elementComputedStyle.marginTop) +
          parseInt(elementComputedStyle.marginBottom)
}
</script>

<style lang="scss" scoped>
.accordion {
  &__title {
    @apply cursor-pointer list-none pl-1;

    &:before {
      content: '';
      @apply inline-block w-0 h-0 align-middle pr-2;
      @apply border-8 border-r-0;
      @apply border-l-gray-700 dark:border-l-gray-200;
      @apply border-t-transparent border-b-transparent;
      @apply transition-all duration-200 ease-in-out;
      transform-origin: 25% 50%;
    }
  }

  &[open] {
    .accordion__title {
      &:before {
        @apply rotate-90;
      }
    }
  }
}
</style>