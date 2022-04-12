<template>
  <div class="settings">
    <div class="settings__top">
      <h1 class="settings__title">Settings</h1>
      <router-link
        :to="{ name: 'home' }"
      >
        <v-button tabindex="-1">
          ❌
        </v-button>
      </router-link>
    </div>
    <div class="settings__panel">
      <div class="setting">
        <label for="enableDarkMode">Enable Dark Mode</label>
        <v-toggle
          id="enableDarkMode"
          :toggled="isDark"
          @click="$emit('toggle-dark')"
        />
      </div>
      <div class="setting">
        <label for="showGreeting">Show Greeting</label>
        <v-toggle
          id="showGreeting"
          :toggled="showGreeting"
          @click="$emit('toggle-show-greeting')"
        />
      </div>
      <div class="setting">
        <label for="showClockSeconds">Show Seconds in Clock</label>
        <v-toggle
          id="showClockSeconds"
          :toggled="showClockSeconds"
          @click="$emit('toggle-show-clock-seconds')"
        />
      </div>
      <div class="setting">
        <label for="showQuickAccess">Show Quick Access</label>
        <v-toggle
          id="showQuickAccess"
          :toggled="showQuickAccess"
          @click="$emit('toggle-show-quick-access')"
        />
      </div>
      <div
        v-show="showQuickAccess"
        class="setting setting--descriptive setting--sub"
      >
        <div>
          <label for="autoQuickAccessEntries">
            Automatic Entries
            <span
              v-if="!isRunningAsExtension"
              class="tooltip"
              aria-label="This feature is only available when running as an extension."
              tabindex="0"
            >
              ⚠️
            </span>
          </label>
          <small>Pulls data from the top 5 most visited websites from the browser's history.</small>
        </div>
        <v-toggle
          id="autoQuickAccessEntries"
          :toggled="autoQuickAccessEntries"
          :disabled="!isRunningAsExtension"
          @click="$emit('toggle-auto-quick-access-entries')"
        />
      </div>
      <div class="setting">
        <label for="showNetworkStatus">Show Network Status</label>
        <v-toggle
          id="showNetworkStatus"
          :toggled="showNetworkStatus"
          @click="$emit('toggle-show-network-status')"
        />
      </div>
      <v-accordion class="settings__group">
        <template #summary>
          Background
        </template>
        <div>
          <div class="setting" :class="{'setting--descriptive': hasColorAndImageSet}">
            <div v-if="hasColorAndImageSet">
              <label for="backgroundColor">Color</label>
              <small>The color will only show up if the background image is not opaque.</small>
            </div>
            <label v-else for="backgroundColor">
              Color
            </label>
            <v-color-picker
              id="backgroundColor"
              :color="backgroundColor"
              @input-color="$emit('set-background-color', $event)"
            />
          </div>
          <div
            v-if="backgroundColor"
            class="setting setting--sub"
          >
            <label for="removeBackgroundColor">Remove Custom Color</label>
            <v-button
              id="removeBackgroundColor"
              @click="$emit('set-background-color', '')"
            >
              Clear
            </v-button>
          </div>
          <div class="setting setting--stacked">
            <label for="backgroundImage">Image</label>
            <v-text-input
              placeholder="Image URL (Remote or dataURL)"
              :value="backgroundImage"
              @change="$emit('set-background-image', ($event.target as HTMLInputElement).value)"
            />
          </div>
          <div
            v-if="backgroundImage"
            class="setting setting--sub"
          >
            <label for="removeBackgroundImage">Remove Custom Image</label>
            <v-button
              id="removeBackgroundImage"
              @click="$emit('set-background-image', '')"
            >
              Clear
            </v-button>
          </div>
        </div>
      </v-accordion>
      <div class="setting setting--descriptive">
        <div>
          <label for="resetSettings">Reset Settings</label>
          <small>Resets most settings to their default values, with the exception of Dark Mode and custom Quick Access entries.</small>
        </div>
        <v-button
          id="resetSettings"
          variant="red"
          @click="$emit('reset-settings')"
        >
          Reset
        </v-button>
      </div>
    </div>
    <div class="settings__version">
      <small>{{ version }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import VToggle from '@/components/atoms/VToggle.vue'
import VButton from '@/components/atoms/VButton.vue'
import VColorPicker from '@/components/atoms/VColorPicker.vue'
import VTextInput from '@/components/atoms/VTextInput.vue'
import VAccordion from '@/components/atoms/VAccordion.vue'

const props = defineProps({
  isDark: Boolean,
  showGreeting: Boolean,
  showClockSeconds: Boolean,
  showQuickAccess: Boolean,
  autoQuickAccessEntries: Boolean,
  showNetworkStatus: Boolean,
  backgroundColor: String,
  backgroundImage: String,
  version: String,
  isRunningAsExtension: Boolean
})

const hasColorAndImageSet = computed(() => {
  return !!(props.backgroundColor && props.backgroundImage)
})
</script>

<style lang="scss" scoped>
.settings {
  @apply container max-w-sm flex flex-col grow justify-center items-center gap-8;

  &__top {
    @apply w-full flex justify-between items-center;
  }

  &__title {
    @apply text-2xl underline underline-offset-2 decoration-gray-300 dark:decoration-gray-600;
  }

  &__panel {
    @apply w-full flex flex-col gap-4 p-5 rounded;
    @apply bg-gray-200 dark:bg-gray-900;
  }

  &__group {
    @apply gap-2;

    & > div {
      @apply w-full flex flex-col gap-4 mt-4;
    }

    &:not(:last-child) {
      @apply pb-4 border-b border-gray-300 dark:border-gray-800;
    }

    .setting {
      &:not(.setting--sub):nth-last-child(1) {
        @apply border-b-0;
      }
    }
  }

  .setting {
    @apply flex items-center justify-between gap-2;

    &:not(:last-child) {
      @apply pb-4 border-b border-gray-300 dark:border-gray-800;
    }

    &--stacked {
      @apply flex-col items-start;
    }

    &--descriptive {
      & > div {
        @apply flex flex-col;

        small {
          @apply text-gray-500 dark:text-gray-400;
        }
      }
    }

    &--sub {
      @apply relative pl-6;
    }

    *:nth-child(2) {
      @apply self-start flex-shrink-0;
    }
  }

  &__version {
    @apply text-sm text-gray-500 dark:text-gray-400;
  }
}
</style>