<template>
  <div class="news">
    <div class="news__group">
      <v-spinner-mask
        v-if="isLoading"
        class="news__spinner"
      />
      <v-news-article
        v-for="article in articles"
        :key="article.title"
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
        @click="emit('fetch-news-articles')"
      >
        <ReloadIcon />
      </v-button>
      <v-button
        class="action action--shuffle"
        aria-label="Shuffle Articles"
        variant="icon"
        @click="emit('shuffle-news-articles')"
      >
        <ShuffleIcon />
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
import type { Article } from '@/services/news/types/Article';

import VButton from '@/components/atoms/VButton.vue';
import VSpinnerMask from '@/components/molecules/VSpinnerMask.vue';
import VNewsArticle from '@/components/molecules/VNewsArticle.vue';

import ReloadIcon from '@/assets/icons/reload.svg';
import ShuffleIcon from '@/assets/icons/shuffle.svg';

interface Props {
  isLoading: boolean,
  articles: Article[],
  canFetchArticles: boolean,
  error: Error | null
}

withDefaults(defineProps<Props>(),{
  isLoading: true,
  articles: () => [],
  canFetchArticles: true,
  error: null
});

const emit = defineEmits(['fetch-news-articles', 'shuffle-news-articles']);
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