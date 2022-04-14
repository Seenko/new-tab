<template>
  <widget>
    <v-news-widget
      :is-loading="news.isLoading"
      :articles="news.data.articles"
      :can-fetch-articles="news.getCanFetchArticles"
      :error="news.error"
      @fetch-news-articles="doFetchNewsArticles()"
    />
  </widget>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useNewsStore } from '@/store/news'
import { useSettingsStore } from '@/store/settings'

import Widget from '@/widgets/Widget.vue'
import VNewsWidget from '@/components/widgets/VNewsWidget.vue'

const news = useNewsStore()
const settings = useSettingsStore()

const doFetchNewsArticles = () => {
  // Just a default search term of "a" should give us some whatever results
  const searchTerm = settings.newsSearchTerm ? settings.newsSearchTerm : 'a'
  news.loadNewArticles(searchTerm, 4)
}

onMounted(() => {
  if (news.getCanFetchArticles) {
    doFetchNewsArticles()
  }
})
</script>