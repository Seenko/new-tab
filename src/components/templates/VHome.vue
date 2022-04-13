<template>
  <div class="home">
    <v-clock
      :show-seconds="showClockSeconds"
      :show-24-hour="show24HourClock"
    />
    <div
      v-if="showQuickAccess"
      class="home__quickAccess"
    >
      <hr />
      <div class="quickAccess__icons">
        <v-quick-access-entry
          v-for="entry in quickAccessEntries"
          :icon="entry.icon"
          :href="entry.href"
        >
          {{ entry.name }}
        </v-quick-access-entry>
      </div>
    </div>
    <div
      v-if="showNewsArticles"
      class="home__newsArticles"
    >
      <div
        v-if="canShowArticles"
        class="newsArticles__collection"
      >
        <v-news-article
          v-for="article in newsArticles?.slice(0, 5)"
          :title="article.title"
          :summary="article.summary"
          :published_date="new Date(article.published_date)"
          :link="article.link.toString()"
          :topic="article.topic"
          :media="article.media.toString()"
        />
      </div>
      <button
        v-if="canFetchArticles"
        @click="$emit('fetch-news-articles')"
      >
        Load Articles
      </button>
      <div v-if="fetchingArticles">
        Fetching Articles...
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { quickAccessEntry } from '@/types/quickAccessEntry';
import { Article } from '@/services/news/models/Article'

import VClock from '@/components/atoms/VClock.vue'
import VQuickAccessEntry from '@/components/atoms/VQuickAccessEntry.vue'
import VNewsArticle from '@/components/molecules/VNewsArticle.vue'

const props = defineProps({
  showClockSeconds: Boolean,
  show24HourClock: Boolean,
  showQuickAccess: Boolean,
  quickAccessEntries: Array as PropType<Array<quickAccessEntry>>,
  showNewsArticles: Boolean,
  canFetchArticles: Boolean,
  fetchingArticles: Boolean,
  newsArticles: Array as PropType<Array<Article>>
})

const canShowArticles = computed(() => {
  return props.showNewsArticles && !props.fetchingArticles
})
</script>

<style lang="scss" scoped>
.home {
  @apply container flex flex-col grow justify-center items-center;

  &__quickAccess {
    hr {
      @apply max-w-md my-3;
    }

    .quickAccess {
      &__icons {
        @apply flex flex-col justify-center items-center gap-4;
      }
    }
  }

  &__newsArticles {
    @apply mt-20 max-w-md;
  }

  .newsArticles {
    &__collection {
      @apply grid grid-cols-2 gap-4 auto-rows-fr flex-grow;
    }
  }
}
</style>