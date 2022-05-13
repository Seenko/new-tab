<template>
  <base-widget
    :widget="widget"
    :is-editable="isEditable"
  >
    <template #default="slotProps">
      <v-news-widget
        v-bind="slotProps"
        :is-loading="news.isLoading"
        :articles="articles"
        :can-fetch-articles="news.getCanFetchArticles"
        :error="news.error"
        @fetch-news-articles="doFetchNewsArticles($event)"
        @shuffle-news-articles="doShuffleArticles()"
      />
    </template>
    <template #settings>
      <v-news-widget-settings
        :search-term="(widget.settings!.find(setting => setting.id === 'searchTerm')!.value as unknown as string)"
        :search-term-placeholder="(widget.settings!.find(setting => setting.id === 'searchTerm')!.placeholder as unknown as string)"
        @set-setting="emit('set-setting', $event)"
      />
    </template>
  </base-widget>
</template>

<script setup lang="ts">
import type { SearchRequest } from '@/services/news/types/SearchRequest';
import type { Widget } from '@/types/widgetsGrid';

import shuffle from 'lodash/shuffle';
import { computed, ref } from 'vue';
import { useNewsStore } from '@/store/widgets/NewsWidgetStore';

import BaseWidget from '@/widgets/BaseWidget.vue';
import VNewsWidget from '@/components/widgets/VNewsWidget.vue';
import VNewsWidgetSettings from '@/components/widgets/settings/VNewsWidgetSettings.vue';

interface Props {
  widget: Widget;
  isEditable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  widget: () => ({} as unknown as Widget),
  isEditable: false
});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const news = useNewsStore(props.widget.id!)();

const shuffledArticles = ref(shuffle(news.data.articles));

const articles = computed(() => {
  return shuffledArticles.value ? shuffledArticles.value.slice(0, 4) : [];
});

const doShuffleArticles = () => {
  shuffledArticles.value = shuffle(news.data.articles);
};

const doFetchNewsArticles = async (keywords: string) => {
  if (news.getCanFetchArticles) {
    await news.loadNewArticles({
      keywords,
      limit: 100,
      sort: 'popularity',
      languages: ['en']
    } as SearchRequest);
  }

  doShuffleArticles();
};

const emit = defineEmits(['set-setting']);
</script>