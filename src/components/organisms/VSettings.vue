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
          @click="emit('toggle-dark')"
        />
      </template>
    </v-setting-entry>
    <!-- <v-accordion class="settings__group">
      <template #summary>
        Quick Access
      </template>
      <template #content>
        <v-setting-entry
          label-id="autoQuickAccessEntries"
          is-sub-setting
        >
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
              @click="emit('toggle-auto-quick-access-entries')"
            />
          </template>
        </v-setting-entry>
      </template>
    </v-accordion> -->
    <v-accordion class="settings__group">
      <template #summary>
        API Keys
      </template>
      <template #content>
        <v-accordion class="settings__group">
          <template #summary>
            News
          </template>
          <template #content>
            <v-setting-entry label-id="newsApiKey">
              <template #label>
                API Key
              </template>
              <template #control>
                <v-text-input
                  id="newsApiKey"
                  v-model="newsApiKeyModel"
                  placeholder="News API Key"
                />
              </template>
            </v-setting-entry>
          </template>
        </v-accordion>
        <v-accordion class="settings__group">
          <template #summary>
            Weather
          </template>
          <template #content>
            <v-setting-entry label-id="weatherApiKey">
              <template #label>
                API Key
              </template>
              <template #control>
                <v-text-input
                  id="weatherApiKey"
                  v-model="weatherApiKeyModel"
                  placeholder="Weather API Key"
                />
              </template>
            </v-setting-entry>
          </template>
        </v-accordion>
      </template>
    </v-accordion>
    <v-accordion class="settings__group">
      <template #summary>
        Background
      </template>
      <template #content>
        <v-setting-entry
          label-id="backgroundColor"
          is-stacked
        >
          <template #label>
            Color
          </template>
          <template
            v-if="hasColorAndImageSet"
            #description
          >
            The color will only show up if the background image is not opaque.
          </template>
          <template #control>
            <v-color-picker
              id="backgroundColor"
              class="w-full"
              :color="backgroundColor"
              @input-color="emit('set-background-color', $event)"
            />
            <v-button
              v-if="backgroundColor"
              id="removeBackgroundColor"
              class="w-full"
              @click="emit('set-background-color', '')"
            >
              Clear
            </v-button>
          </template>
        </v-setting-entry>
        <v-setting-entry
          v-if="!enableCustomBackgroundImage"
          label-id="backgroundImage"
          is-stacked
        >
          <template #label>
            Image
          </template>
          <template #control>
            <div class="grid grid-cols-2 gap-2">
              <v-button
                class="col-span-2"
                @click="emit('set-background-image', '')"
              >
                None
              </v-button>
              <v-button
                v-for="(image, index) in backgroundImages"
                :key="index"
                tight
                @click="emit('set-background-image', `/assets/backgrounds/${image}.png`)"
              >
                <img
                  class="aspect-video"
                  :src="`/assets/backgrounds/thumb/${image}.png`"
                  alt=""
                >
              </v-button>
            </div>
          </template>
        </v-setting-entry>
        <v-setting-entry
          label-id="enableCustomBackgroundImage"
          no-bottom-border
        >
          <template #label>
            Custom Image
          </template>
          <template #control>
            <v-toggle
              id="enableCustomBackgroundImage"
              :toggled="enableCustomBackgroundImage"
              @click="emit('toggle-enable-custom-background-image')"
            />
          </template>
        </v-setting-entry>
        <v-setting-entry
          v-if="enableCustomBackgroundImage"
          label-id="customBackgroundImage"
          sr-only-label
          is-stacked
        >
          <template #label>
            Custom Image
          </template>
          <template #control>
            <div class="flex flex-col gap-2">
              <div class="flex flex-col gap-2">
                <v-text-input
                  id="customBackgroundImage"
                  v-model="customBackgroundImageModel"
                  placeholder="Custom Image URL"
                  maxlength="1024"
                />
              </div>
            </div>
          </template>
        </v-setting-entry>
      </template>
    </v-accordion>
    <v-accordion class="settings__group">
      <template #summary>
        Miscellaneous
      </template>
      <template #content>
        <v-setting-entry label-id="showNetworkStatus">
          <template #label>
            Show Network Status
          </template>
          <template #control>
            <v-toggle
              id="showNetworkStatus"
              :toggled="showNetworkStatus"
              @click="emit('toggle-show-network-status')"
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
              @click="emit('import-settings')"
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
              @click="emit('export-settings')"
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
              @click="emit('reset-settings')"
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
import { computed } from 'vue';

import VToggle from '@/components/atoms/VToggle.vue';
import VButton from '@/components/atoms/VButton.vue';
import VColorPicker from '@/components/atoms/VColorPicker.vue';
import VTextInput from '@/components/atoms/VTextInput.vue';
import VAccordion from '@/components/atoms/VAccordion.vue';
import VSettingEntry from '@/components/molecules/VSettingEntry.vue';

const props = defineProps({
  isDark: Boolean,
  newsApiKey: { type: String, required: true },
  weatherApiKey: { type: String, required: true },
  showNetworkStatus: Boolean,
  backgroundColor: { type: String, required: true },
  enableCustomBackgroundImage: Boolean,
  backgroundImage: { type: String, required: true }
});

const emit = defineEmits([
  'toggle-dark',
  'set-news-api-key',
  'set-weather-api-key',
  'set-background-color',
  'toggle-enable-custom-background-image',
  'set-background-image',
  'toggle-show-network-status',
  'import-settings',
  'export-settings',
  'reset-settings'
]);

const newsApiKeyModel = computed({ 
  get: () => props.newsApiKey, 
  set: (value) => emit('set-news-api-key', value)
});

const weatherApiKeyModel = computed({ 
  get: () => props.weatherApiKey, 
  set: (value) => emit('set-weather-api-key', value)
});

const customBackgroundImageModel = computed({ 
  get: () => props.backgroundImage, 
  set: (value) => emit('set-background-image', value)
});

const hasColorAndImageSet = computed(() => !!(props.backgroundColor && props.backgroundImage));

const backgroundImages = [
  'chaos',
  'leaves',
  'scribble',
  'spiral',
  'reflection',
  'burst'
];
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

    & .settings__group {
      @apply ml-6;
    }
  }
}
</style>