<template>
  <base-widget>
    <template #default="slotProps">
      <v-news-widget
        v-bind="slotProps"
        :is-loading="news.isLoading"
        :articles="articles"
        :can-fetch-articles="news.getCanFetchArticles"
        :error="news.error"
        @fetch-news-articles="doFetchNewsArticles()"
        @shuffle-news-articles="doShuffleArticles()"
      />
    </template>
  </base-widget>
</template>

<script setup lang="ts">
import shuffle from 'lodash/shuffle';
import { onMounted, computed, ref } from 'vue';
import { useNewsStore } from '@/store/news';

import BaseWidget from '@/widgets/BaseWidget.vue';
import VNewsWidget from '@/components/widgets/VNewsWidget.vue';
import { SearchRequest } from '@/services/news/types/SearchRequest';

const news = useNewsStore();

interface Props {
  searchTerm?: string;
}

const props = withDefaults(defineProps<Props>(), {
  searchTerm: ''
});

const shuffledArticles = ref(shuffle(news.data.articles));

const articles = computed(() => {
  return shuffledArticles.value ? shuffledArticles.value.slice(0, 4) : [];
});

const doShuffleArticles = () => {
  shuffledArticles.value = shuffle(news.data.articles);
};

// TODO: create a cache for each instance of this widget
// right now, if one multiple widget has a search term
// they will all display the articles from the first widget
// that is able to shoot a call and get a reply
const doFetchNewsArticles = async () => {
  await news.loadNewArticles({
    keywords: props.searchTerm,
    limit: 100,
    sort: 'popularity',
    languages: ['en']
  } as SearchRequest);

  doShuffleArticles();
};

onMounted(() => {
  if (news.getCanFetchArticles) {
    doFetchNewsArticles();
  }
});
</script>