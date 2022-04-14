<template>
  <div class="home">
    <greeting-widget v-if="showGreeting" />
    <clock-widget v-if="showClock" />
    <quick-access-widget v-if="showQuickAccess" />
    <news-widget v-if="showNewsArticles" />
  </div>
</template>

<script setup lang="ts">
import GreetingWidget from '@/widgets/GreetingWidget.vue'
import ClockWidget from '@/widgets/ClockWidget.vue'
import QuickAccessWidget from '@/widgets/QuickAccessWidget.vue'
import NewsWidget from '@/widgets/NewsWidget.vue'

defineProps({
  showGreeting: Boolean,
  showClock: Boolean,
  showQuickAccess: Boolean,
  showNewsArticles: Boolean,
})
</script>

<style lang="scss" scoped>
.home {
  @apply container flex flex-col grow gap-8 justify-center items-center;
}
</style>