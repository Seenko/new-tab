<template>
  <div>{{ currentHour }}</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  now: Date;
  showClockSeconds?: boolean;
  show24HourClock?: boolean;
  timezone?: string;
}

const props = withDefaults(defineProps<Props>(),{
  now: () => new Date(),
  showClockSeconds: false,
  show24HourClock: false,
  timezone: ''
});

const currentHour = computed(() => {
  let options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: props.showClockSeconds ? 'numeric' : undefined,
    hourCycle: props.show24HourClock ? 'h24' : 'h12',
  };

  if (props.timezone) options.timeZone = props.timezone;

  return props.now.toLocaleString(undefined, options);
});
</script>

<style lang="scss" scoped>
div {
  @apply text-6xl sm:text-8xl font-black;
}
</style>