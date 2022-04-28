<template>
  <widget>
    <v-news-widget
      :is-loading="news.isLoading"
      :articles="articles"
      :can-fetch-articles="news.getCanFetchArticles"
      :error="news.error"
      @fetch-news-articles="doFetchNewsArticles()"
      @shuffle-news-articles="doShuffleArticles()"
    />
  </widget>
</template>

<script setup lang="ts">
import shuffle from 'lodash/shuffle'
import { onMounted, computed, ref } from 'vue'
import { useNewsStore } from '@/store/news'
import { useSettingsStore } from '@/store/settings'

import Widget from '@/widgets/Widget.vue'
import VNewsWidget from '@/components/widgets/VNewsWidget.vue'
import { SearchRequest } from '@/services/news/types/SearchRequest'

const news = useNewsStore()
const settings = useSettingsStore()

const shuffledArticles = ref(shuffle(news.data.articles))

const articles = computed(() => {
  return shuffledArticles.value ? shuffledArticles.value.slice(0, 4) : []
})

const doShuffleArticles = () => {
  shuffledArticles.value = shuffle(news.data.articles)
}

const doFetchNewsArticles = async () => {
  await news.loadNewArticles({
    keywords: settings.newsSearchTerm,
    limit: 100,
    sort: 'popularity',
    languages: ['en']
  } as SearchRequest)

  doShuffleArticles()
}

onMounted(() => {
  if (news.getCanFetchArticles) {
    doFetchNewsArticles()
  }
})
</script>