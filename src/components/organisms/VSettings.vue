<template>
  <div class="settings">
    <v-setting-entry label-id="enableDarkMode">
      <template #label>
        Enable Dark Mode
      </template>
      <template #control>
        <v-toggle
          id="enableDarkMode"
          :toggled="isDark"
          @click="$emit('toggle-dark')"
        />
      </template>
    </v-setting-entry>
    <v-accordion class="settings__group">
      <template #summary>
        Clock
      </template>
      <template #content>
        <v-setting-entry label-id="showClock">
          <template #label>
            Show Clock
          </template>
          <template #control>
            <v-toggle
              id="showClock"
              :toggled="showClock"
              @click="$emit('toggle-show-clock')"
            />
          </template>
        </v-setting-entry>
        <v-setting-entry label-id="show24HourClock">
          <template #label>
            Show 24 Hour Clock
          </template>
          <template #control>
            <v-toggle
              id="show24HourClock"
              :toggled="show24HourClock"
              @click="$emit('toggle-show-24-hour-clock')"
            />
          </template>
        </v-setting-entry>
        <v-setting-entry label-id="showClockSeconds">
          <template #label>
            Show Seconds in Clock
          </template>
          <template #control>
            <v-toggle
              id="showClockSeconds"
              :toggled="showClockSeconds"
              @click="$emit('toggle-show-clock-seconds')"
            />
          </template>
        </v-setting-entry>
      </template>
    </v-accordion>
    <v-accordion class="settings__group">
      <template #summary>
        Quick Access
      </template>
      <template #content>
        <v-setting-entry label-id="showQuickAccess">
          <template #label>
            Show Quick Access
          </template>
          <template #control>
            <v-toggle
              id="showQuickAccess"
              :toggled="showQuickAccess"
              @click="$emit('toggle-show-quick-access')"
            />
          </template>
        </v-setting-entry>
        <v-setting-entry label-id="autoQuickAccessEntries" is-sub-setting>
          <template #label>
            Automatic Entries
            <span
              v-if="!isRunningAsExtension"
              class="tooltip"
              aria-label="This feature is only available when running as an extension."
              tabindex="0"
            >
              ⚠️
            </span>
          </template>
          <template #description>
            Pulls data from the top 5 most visited websites from the browser's history.
          </template>
          <template #control>
            <v-toggle
              id="autoQuickAccessEntries"
              :toggled="autoQuickAccessEntries"
              :disabled="!isRunningAsExtension"
              @click="$emit('toggle-auto-quick-access-entries')"
            />
          </template>
        </v-setting-entry>
      </template>
    </v-accordion>
    <v-accordion class="settings__group">
      <template #summary>
        News
      </template>
      <template #content>
        <v-setting-entry label-id="showNewsArticles">
          <template #label>
            Show News Articles
          </template>
          <template #description>
            Articles powered by NewsCatcher
          </template>
          <template #control>
            <v-toggle
              id="showNewsArticles"
              :toggled="showNewsArticles"
              :disabled="!newsCatcherApiKey"
              @click="$emit('toggle-show-news-articles')"
            />
          </template>
        </v-setting-entry>
        <v-setting-entry label-id="newsSearchTerm">
          <template #label>
            Search Term
          </template>
          <template #control>
            <v-text-input
              id="newsSearchTerm"
              placeholder="Tesla"
              :value="newsSearchTerm"
              @change="$emit('set-news-search-term', ($event.target as HTMLInputElement).value)"
            />
          </template>
        </v-setting-entry>
        <v-setting-entry label-id="newsCatcherApiKey">
          <template #label>
            API Key
          </template>
          <template #control>
            <v-text-input
              id="newsCatcherApiKey"
              placeholder="API Key"
              :value="newsCatcherApiKey"
              @change="$emit('set-newscatcher-api-key', ($event.target as HTMLInputElement).value)"
            />
          </template>
        </v-setting-entry>
      </template>
    </v-accordion>
    <v-accordion class="settings__group">
      <template #summary>
        Background
      </template>
      <template #content>
        <v-setting-entry label-id="backgroundColor" is-stacked>
          <template #label>
            Color
          </template>
          <template #description v-if="hasColorAndImageSet">
            The color will only show up if the background image is not opaque.
          </template>
          <template #control>
            <v-color-picker
              id="backgroundColor"
              class="w-full"
              :color="backgroundColor"
              @input-color="$emit('set-background-color', $event)"
            />
            <v-button
              v-if="backgroundColor"
              id="removeBackgroundColor"
              class="w-full"
              @click="$emit('set-background-color', '')"
            >
              Clear
            </v-button>
          </template>
        </v-setting-entry>
        <v-setting-entry label-id="backgroundImage" is-stacked>
          <template #label>
            Image
          </template>
          <template #control>
            <v-text-input
              id="backgroundImage"
              placeholder="Image URL (Remote or dataURL)"
              :value="backgroundImage"
              @change="$emit('set-background-image', ($event.target as HTMLInputElement).value)"
            />
            <v-button
              v-if="backgroundImage"
              id="removeBackgroundImage"
              class="w-full"
              @click="$emit('set-background-image', '')"
            >
              Clear
            </v-button>
          </template>
        </v-setting-entry>
      </template>
    </v-accordion>
    <v-accordion class="settings__group">
      <template #summary>
        Miscellaneous
      </template>
      <template #content>
        <v-setting-entry label-id="showGreeting">
          <template #label>
            Show Greeting
          </template>
          <template #control>
            <v-toggle
              id="showGreeting"
              :toggled="showGreeting"
              @click="$emit('toggle-show-greeting')"
            />
          </template>
        </v-setting-entry>
        <v-setting-entry label-id="showNetworkStatus">
          <template #label>
            Show Network Status
          </template>
          <template #control>
            <v-toggle
              id="showNetworkStatus"
              :toggled="showNetworkStatus"
              @click="$emit('toggle-show-network-status')"
            />
          </template>
        </v-setting-entry>
      </template>
    </v-accordion>
    <v-accordion class="settings__group">
      <template #summary>
        Manage Settings
      </template>
      <template #content>
        <v-setting-entry label-id="importSettings">
          <template #label>
            Import
            <span
              class="tooltip"
              aria-label="Feature not yet implemented."
              tabindex="0"
            >
              🚧
            </span>
          </template>
          <template #description>
            Select a compatible JSON file from your computer to import its settings.
          </template>
          <template #control>
            <v-button
              id="importSettings"
              disabled
              @click="$emit('import-settings')"
            >
              Import
            </v-button>
          </template>
        </v-setting-entry>
        <v-setting-entry label-id="exportSettings">
          <template #label>
            Export
            <span
              class="tooltip"
              aria-label="Feature not yet implemented."
              tabindex="0"
            >
              🚧
            </span>
          </template>
          <template #description>
            Exports your current settings as a JSON file so it can be easily restored.
          </template>
          <template #control>
            <v-button
              id="exportSettings"
              disabled
              @click="$emit('export-settings')"
            >
              Export
            </v-button>
          </template>
        </v-setting-entry>
        <v-setting-entry label-id="resetSettings">
          <template #label>
            Reset Settings
          </template>
          <template #description>
            Resets most settings to their default values, with the exception of Dark Mode and custom Quick Access entries.
          </template>
          <template #control>
            <v-button
              id="resetSettings"
              variant="red"
              @click="$emit('reset-settings')"
            >
              Reset
            </v-button>
          </template>
        </v-setting-entry>
      </template>
    </v-accordion>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import VToggle from '@/components/atoms/VToggle.vue'
import VButton from '@/components/atoms/VButton.vue'
import VColorPicker from '@/components/atoms/VColorPicker.vue'
import VTextInput from '@/components/atoms/VTextInput.vue'
import VAccordion from '@/components/atoms/VAccordion.vue'
import VSettingEntry from '@/components/molecules/VSettingEntry.vue'

const props = defineProps({
  isDark: Boolean,
  showGreeting: Boolean,
  showClock: Boolean,
  showClockSeconds: Boolean,
  show24HourClock: Boolean,
  showQuickAccess: Boolean,
  autoQuickAccessEntries: Boolean,
  showNewsArticles: Boolean,
  newsSearchTerm: String,
  newsCatcherApiKey: String,
  showNetworkStatus: Boolean,
  backgroundColor: String,
  backgroundImage: String,
  isRunningAsExtension: Boolean
})

const hasColorAndImageSet = computed(() => {
  return !!(props.backgroundColor && props.backgroundImage)
})
</script>

<style lang="scss" scoped>
.settings {
  @apply w-full flex flex-col gap-4;

  &__group {
    @apply gap-2;

    & > ::v-deep(.accordion__content) {
      @apply w-full flex flex-col gap-4 mt-4;
    }

    &:not(:last-child) {
      @apply pb-4 border-b border-gray-300 dark:border-gray-800;
    }
  }
}
</style>