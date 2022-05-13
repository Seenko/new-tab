<template>
  <v-setting-entry label-id="show24HourClock">
    <template #label>
      Show 24 Hour Clock
    </template>
    <template #control>
      <v-toggle
        id="show24HourClock"
        :toggled="show24HourClock"
        @click="emit('set-setting', { id: 'show24HourClock', value: !(show24HourClock) })"
      />
    </template>
  </v-setting-entry>
  <v-setting-entry label-id="showClockSeconds">
    <template #label>
      Show Clock Seconds
    </template>
    <template #control>
      <v-toggle
        id="showClockSeconds"
        :toggled="showClockSeconds"
        @click="emit('set-setting', { id: 'showClockSeconds', value: !(showClockSeconds) })"
      />
    </template>
  </v-setting-entry>
  <v-setting-entry label-id="timezone">
    <template #label>
      Timezone
    </template>
    <template #control>
      <v-select
        :options="timezoneList"
        :model-value="timezone"
        @update:model-value="emit('set-setting', { id: 'timezone', value: $event })"
      >
        <template #option="{ data }">
          {{ data.name }}
        </template>
      </v-select>
    </template>
  </v-setting-entry>
</template>

<script setup lang="ts">
import VSettingEntry from '@/components/molecules/VSettingEntry.vue';
import VToggle from '@/components/atoms/VToggle.vue';
import VSelect from '@/components/atoms/VSelect.vue';

interface Props {
  show24HourClock: boolean;
  showClockSeconds: boolean;
  timezone: number;
  timezoneList: Array<string>;
}

withDefaults(defineProps<Props>(), {
  show24HourClock: false,
  showClockSeconds: false,
  timezone: 0,
  timezoneList: () => ([])
});

const emit = defineEmits(['set-setting']);
</script>