<template>
  <form
    v-if="isEditing === 'href'"
    class="site"
    @submit.prevent="saveEditing()"
    @reset.prevent="setEditing('none')"
  >
    <v-text-input
      placeholder="https://example.com"
      autofocus
      :model-value="quickAccessEntryModel.href"
      @update:model-value="quickAccessEntryModel = { ...quickAccessEntryModel, href: $event }"
    />
    <v-button
      variant="icon"
      type="reset"
    >
      <CloseIcon class="w-4 h-4" />
    </v-button>
    <v-button
      variant="icon"
      type="submit"
      :disabled="!isValidURL"
    >
      <SaveIcon class="w-4 h-4" />
    </v-button>
  </form>
  <form
    v-else-if="isEditing === 'name'"
    class="site"
    @submit.prevent="saveEditing()"
    @reset.prevent="setEditing('none')"
  >
    <v-text-input
      placeholder="Example"
      autofocus
      :model-value="quickAccessEntryModel.name"
      @update:model-value="quickAccessEntryModel = { ...quickAccessEntryModel, name: $event }"
    />
    <v-button
      variant="icon"
      type="reset"
    >
      <CloseIcon class="w-4 h-4" />
    </v-button>
    <v-button
      variant="icon"
      type="submit"
    >
      <SaveIcon class="w-4 h-4" />
    </v-button>
  </form>
  <div
    v-else
    class="site"
  >
    <div class="site__info">
      <img
        class="site__icon"
        :src="parsedIcon"
        alt=""
      >
      <span class="site__name">
        {{ parsedName }}
      </span>
    </div>
    <div class="site__actions">
      <v-button
        variant="icon"
        @click="setEditing('name')"
      >
        <PencilIcon class="w-4 h-4" />
      </v-button>
      <v-button
        variant="icon"
        @click="setEditing('href')"
      >
        <LinkIcon class="w-4 h-4" />
      </v-button>
      <v-button
        v-if="isRemovable"
        variant="icon"
        @click="emit('remove', quickAccessEntryModel)"
      >
        <TrashIcon class="w-4 h-4" />
      </v-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QuickAccessEntry } from '@/types/QuickAccessEntry';

import { ref, computed } from 'vue';
import { isRunningAsExtension } from '@/utils/browser';

import VButton from '@/components/atoms/VButton.vue';
import VTextInput from '@/components/atoms/VTextInput.vue';

import PencilIcon from '@/assets/icons/pencil.svg';
import LinkIcon from '@/assets/icons/link.svg';
import TrashIcon from '@/assets/icons/trash.svg';
import SaveIcon from '@/assets/icons/save.svg';
import CloseIcon from '@/assets/icons/close.svg';

interface Props {
  modelValue: QuickAccessEntry;
  isRemovable: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({
    name: '',
    icon: '',
    href: ''
  }),
  isRemovable: false
});

const editingQuickAccessEntry = ref<QuickAccessEntry>();

const quickAccessEntryModel = computed({
  get: () => props.modelValue, 
  set: (value) => editingQuickAccessEntry.value = value
});

const parsedName = computed(() => {
  if (quickAccessEntryModel.value.name) {
    return quickAccessEntryModel.value.name;
  } else {
    return new URL(quickAccessEntryModel.value.href as string).hostname.replace(/^www\./, '');
  }
});

const parsedIcon = computed(() => {
  if (quickAccessEntryModel.value.icon) {
    return quickAccessEntryModel.value.icon;
  } else {
    if (isRunningAsExtension) {
      return `chrome://favicon/${new URL(quickAccessEntryModel.value.href as string).origin}`;
    } else {
      return `https://www.google.com/s2/favicons?domain=${new URL(quickAccessEntryModel.value.href as string).origin}`;
    }
  }
});

const isValidURL = computed(() => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    new URL(editingQuickAccessEntry.value!.href);
  } catch (e) {
    return false;
  }

  return true;
});

type EditingType = 'name' | 'href' | 'none';

const isEditing = ref<EditingType>('none');
const setEditing = (value: EditingType) => {
  editingQuickAccessEntry.value = props.modelValue;
  isEditing.value = value;
};

const saveEditing = () => {
  if (isValidURL.value) {
    emit('update:modelValue', editingQuickAccessEntry.value);
  setEditing('none');
  }
};

const emit = defineEmits(['update:modelValue', 'remove']);
</script>

<style lang="scss" scoped>
.site {
  @apply flex flex-row items-center justify-between gap-2;
  @apply w-full;

  &__info {
    @apply flex flex-row items-center gap-2;
  }

  &__actions {
    @apply flex flex-row;
  }

  &__icon {
    @apply w-4 h-4;
  }

  &__input {
    &--invalid {
      @apply border-red-600 outline-red-600;
    }
  }
}
</style>