<template>
  <div class="relative">
    <v-button
      v-if="showEditSettingsButton"
      class="absolute -top-5 -right-5"
      variant="icon"
      @click="toggleWidgetSettings()"
    >
      <EditIcon />
    </v-button>
    <v-widget
      :is-editable="isEditable"
      :is-editing-widgets="application.isEditingWidgets"
    >
      <slot v-bind="bindSettings" />
    </v-widget>
    <v-modal
      :is-open="isWidgetSettingsOpen"
      @close="toggleWidgetSettings()"
    >
      <template #header>
        Widget Settings
      </template>
      <template #content>
        <div class="flex flex-col gap-4">
          <v-setting-entry
            v-for="(setting, index) in settings"
            :key="index"
            :label-id="setting.id"
          >
            <template #label>
              {{ setting.name }}
            </template>
            <template #control>
              <v-toggle
                v-if="setting.type === 'boolean'"
                :id="setting.id"
                :toggled="(setting.value as boolean)"
                @click="emit('set-setting', { id: setting.id, value: !(setting.value as boolean) })"
              />
              <v-text-input
                v-else-if="setting.type === 'string'"
                :id="setting.id"
                :model-value="(setting.value as string)"
                @update:model-value="emit('set-setting', { id: setting.id, value: $event })"
              />
            </template>
          </v-setting-entry>
        </div>
      </template>
    </v-modal>
  </div>
</template>

<script setup lang="ts">
import type { WidgetSetting } from '@/types/widgetsGrid';

import { ref, computed } from 'vue';

import VWidget from '@/components/widgets/VWidget.vue';
import VButton from '@/components/atoms/VButton.vue';
import VModal from '@/components/molecules/VModal.vue';
import VSettingEntry from '@/components/molecules/VSettingEntry.vue';

import VToggle from '@/components/atoms/VToggle.vue';
import VTextInput from '@/components/atoms/VTextInput.vue';

import EditIcon from '@/assets/icons/edit.svg';

import { useApplicationStore } from '@/store/application';

interface Props {
  isEditable?: boolean;
  settings?: Array<WidgetSetting>;
}

const props = withDefaults(defineProps<Props>(), {
  isEditable: false,
  settings: () => []
});

const bindSettings = computed(() => {
  let settings: { [id: string]: unknown } = {};

  props.settings.forEach(setting => {
    settings[setting.id] = setting.value;
  });

  return settings;
});

const application = useApplicationStore();

const showEditSettingsButton = computed(() => {
  return props.isEditable && application.isEditingWidgets && props.settings.length > 0;
});

const isWidgetSettingsOpen = ref<boolean>(false);

const toggleWidgetSettings = () => {
  isWidgetSettingsOpen.value = !isWidgetSettingsOpen.value;
};

const emit = defineEmits(['set-setting']);
</script>