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
    <div class="news__actions">
      <v-button
        v-if="canFetchArticles"
        class="action action--fetch"
        aria-label="Fetch Articles"
        variant="icon"
        @click="$emit('fetch-news-articles')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.5 2c-5.629 0-10.212 4.436-10.475 10h-3.025l4.537 5.917 4.463-5.917h-2.975c.26-3.902 3.508-7 7.475-7 4.136 0 7.5 3.364 7.5 7.5s-3.364 7.5-7.5 7.5c-2.381 0-4.502-1.119-5.876-2.854l-1.847 2.449c1.919 2.088 4.664 3.405 7.723 3.405 5.798 0 10.5-4.702 10.5-10.5s-4.702-10.5-10.5-10.5z"/></svg>
      </v-button>
      <v-button
        class="action action--shuffle"
        aria-label="Shuffle Articles"
        variant="icon"
        @click="$emit('shuffle-news-articles')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M2 7h-2v-2h2c3.49 0 5.48 1.221 6.822 2.854-.41.654-.754 1.312-1.055 1.939-1.087-1.643-2.633-2.793-5.767-2.793zm16 10c-3.084 0-4.604-1.147-5.679-2.786-.302.627-.647 1.284-1.06 1.937 1.327 1.629 3.291 2.849 6.739 2.849v3l6-4-6-4v3zm0-10v3l6-4-6-4v3c-5.834 0-7.436 3.482-8.85 6.556-1.343 2.921-2.504 5.444-7.15 5.444h-2v2h2c5.928 0 7.543-3.511 8.968-6.609 1.331-2.893 2.479-5.391 7.032-5.391z"/></svg>
      </v-button>
    </div>
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
  @apply flex flex-col gap-1 max-w-md;

  &__group {
    @apply grid grid-cols-2 gap-4 auto-rows-fr flex-grow relative;
  }

  &__spinner {
    @apply rounded-lg;
  }

  &__actions {
    @apply flex flex-row justify-end gap-2;

    .action svg {
      @apply h-4;
    }
  }

  &__error {
    @apply text-center;
  }
}
</style>