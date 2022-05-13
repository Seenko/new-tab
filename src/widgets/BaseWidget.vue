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
        class="base__mismatchingIcon"
      />
      <EditIcon />
    </v-button>
    <v-widget
      :is-editable="isEditable"
      :is-editing="application.isEditingWidgets"
    >
      <slot v-bind="widgetProps" />
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
          <v-alert
            v-if="showMismatchingSignatureAlert"
            class="base__mismatchingAlert"
          >
            <template #icon>
              <AlertIcon />
            </template>
            <p>Oops, something is off here!</p>
            <template #footer>
              <small>
                <p>We have detected that this widget instance does not match its signature in the registry, meaning that it is in a unstable state.</p>
                <p>This most likely happened because this widget has been updated with new settings.</p>
                <p>To get rid of this message and be able to adjust this widget's settings again, you need to <b>recreate</b> this instance.</p>
                <p><i>You can leave this widget as is but that is not advised.</i></p>
              </small>
            </template>
          </v-alert>
          <slot
            v-else
            name="settings"
          />
        </div>
      </template>
    </v-modal>
  </div>
</template>

<script setup lang="ts">
import type { Widget } from '@/types/widgetsGrid';

import { ref, computed, useSlots } from 'vue';

import VWidget from '@/components/widgets/VWidget.vue';
import VButton from '@/components/atoms/VButton.vue';
import VAlert from '@/components/atoms/VAlert.vue';
import VModal from '@/components/molecules/VModal.vue';

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

const widgetProps = computed(() => {
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
  return props.isEditable && application.isEditingWidgets && Object.keys(widgetProps.value).length > 0 && slots.settings;
});

const isWidgetSettingsOpen = ref<boolean>(false);

const toggleWidgetSettings = () => {
  isWidgetSettingsOpen.value = !isWidgetSettingsOpen.value;
};

const slots = useSlots();
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

  &__mismatchingIcon {
    @apply absolute w-4 h-4 bottom-0 right-0 fill-red-500;
  }

  &__mismatchingAlert {
    small {
      @apply flex flex-col gap-2;
    }
  }
}
</style>