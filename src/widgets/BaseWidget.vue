<template>
  <div class="base">
    <v-button
      v-if="showEditSettingsButton"
      class="base__settings"
      variant="icon"
      @click="toggleWidgetSettings()"
    >
      <AlertIcon
        v-if="showMismatchingSignatureAlert"
        class="absolute w-4 h-4 bottom-0 right-0 fill-red-500"
      />
      <EditIcon />
    </v-button>
    <v-widget
      :is-editable="isEditable"
      :is-editing="application.isEditingWidgets"
    >
      <slot v-bind="widgetSettings" />
    </v-widget>
    <v-modal
      :is-open="isWidgetSettingsOpen"
      @close="toggleWidgetSettings()"
    >
      <template #header>
        {{ widget.name }}
      </template>
      <template #content>
        <div class="base__modal">
          <v-alert v-if="showMismatchingSignatureAlert">
            <template #icon>
              <AlertIcon />
            </template>
            <p>Oops, something is off here!</p>
            <template #footer>
              <small class="flex flex-col gap-2">
                <p>When the widget being used doesn't match it's type in the registry you may not see the correct settings reflected on this page.</p>
                <p>Therefore, we have hidden them from you to avoid unstable behavior.</p>
                <p>To fix this issue and be able to adjust this widget's setting, you need to <b>recreate</b> this instance.</p>
              </small>
            </template>
          </v-alert>
          <v-setting-entry
            v-for="(setting, index) in widget.settings"
            v-else
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
                :placeholder="setting.placeholder"
                @update:model-value="emit('set-setting', { id: setting.id, value: $event })"
              />
              <v-select
                v-else-if="setting.type === 'select'"
                :options="setting.values"
                :model-value="(setting.value as number)"
                @update:model-value="emit('set-setting', { id: setting.id, value: $event })"
              >
                <template #option="{ data }">
                  {{ (data as WigetSettingValue).name }}
                </template>
              </v-select>
            </template>
          </v-setting-entry>
        </div>
      </template>
    </v-modal>
  </div>
</template>

<script setup lang="ts">
import type { Widget, WigetSettingValue } from '@/types/widgetsGrid';

import { ref, computed } from 'vue';

import VWidget from '@/components/widgets/VWidget.vue';
import VButton from '@/components/atoms/VButton.vue';
import VAlert from '@/components/atoms/VAlert.vue';
import VModal from '@/components/molecules/VModal.vue';
import VSettingEntry from '@/components/molecules/VSettingEntry.vue';

import VToggle from '@/components/atoms/VToggle.vue';
import VTextInput from '@/components/atoms/VTextInput.vue';
import VSelect from '@/components/atoms/VSelect.vue';

import AlertIcon from '@/assets/icons/alert.svg';
import EditIcon from '@/assets/icons/edit.svg';

import { useApplicationStore } from '@/store/application';

interface Props {
  mismatchingSignature?: boolean;
  isEditable?: boolean;
  widget?: Widget;
}

const props = withDefaults(defineProps<Props>(), {
  mismatchingSignature: false,
  isEditable: false,
  widget: () => ({} as unknown as Widget),
});

const widgetSettings = computed(() => {
  let settings: { [id: string]: unknown } = {};

  if (props.widget && props.widget.settings) {
    props.widget.settings.forEach(setting => {
      if (setting.type === 'select' && setting.values) {
        settings[setting.id] = setting.values[(setting.value as number)].value;
      } else {
        settings[setting.id] = setting.value;
      }
    });
  }

  return settings;
});

const application = useApplicationStore();

const showMismatchingSignatureAlert = computed(() => {
  return props.isEditable && application.isEditingWidgets && props.mismatchingSignature;
});

const showEditSettingsButton = computed(() => {
  return props.isEditable && application.isEditingWidgets && Object.keys(widgetSettings.value).length > 0;
});

const isWidgetSettingsOpen = ref<boolean>(false);

const toggleWidgetSettings = () => {
  isWidgetSettingsOpen.value = !isWidgetSettingsOpen.value;
};

const emit = defineEmits(['set-setting']);
</script>

<style lang="scss" scoped>
.base {
  @apply relative;

  &__settings{
    @apply absolute -top-5 -right-5;
  }

  &__modal {
    @apply flex flex-col gap-4;
  }
}
</style>