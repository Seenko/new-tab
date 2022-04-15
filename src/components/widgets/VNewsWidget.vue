<template>
  <div class="news">
    <div class="news__group">
      <v-spinner-mask
        v-if="isLoading"
        class="news__spinner"
      />
      <v-news-article
        v-for="article in articles"
        class="news__article"
        :title="article.title"
        :description="article.description"
        :published_at="new Date(article.published_at)"
        :author="article.author"
        :source="article.source"
        :link="article.url"
        :media="article.image"
        :category="article.category"
      />
    </div>
    <v-button
      v-if="canFetchArticles"
      class="news__refresh"
      @click="$emit('fetch-news-articles')"
    >
      Fetch Articles
    </v-button>
    <!-- <v-button
      class="news__shuffle"
      @click="$emit('shuffle-news-articles')"
    >
      Shuffle Articles
    </v-button> -->
    <p
      v-if="error"
      class="news__error"
    >
      An error happened whilst trying to fetch recent news, please try again later.
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Article } from '@/services/news/models/Article'
import { PropType } from 'vue'

import VButton from '@/components/atoms/VButton.vue'
import VSpinnerMask from '@/components/molecules/VSpinnerMask.vue'
import VNewsArticle from '@/components/molecules/VNewsArticle.vue'

defineProps({
  isLoading: Boolean,
  articles: Array as PropType<Array<Article>>,
  canFetchArticles: Boolean,
  error: Error
})
</script>

<style lang="scss" scoped>
.news {
  @apply flex flex-col gap-4 max-w-md;

  &__group {
    @apply grid grid-cols-2 gap-4 auto-rows-fr flex-grow relative;
  }

  &__spinner {
    @apply rounded-lg;
  }

  &__error {
    @apply text-center;
  }
}
</style>