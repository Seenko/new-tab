import type { Article } from '@/services/news/types/Article';
import type { SearchRequest } from '@/services/news/types/SearchRequest';

import { defineStore } from 'pinia';
import { useStorage, useNow, useOnline } from '@vueuse/core';
import { preloadImageURL } from '@/utils/image';

import NewsService from '@/services/news';

interface News {
  articles: Array<Article>;
  lastUpdated: number;
}

const defaultNews: News = {
  articles: [],
  lastUpdated: 0
};

export const useNewsStore = (instanceName: string) => defineStore({
  id: `news-${instanceName}`,
  state: () => ({
    data: useStorage(`news-${instanceName}`, defaultNews),
    isLoading: false,
    error: undefined as Error | undefined
  }),
  getters: {
    getCanFetchArticles(state) {
      const now = useNow();
      const isOnline = useOnline();

      return isOnline.value && (now.value.getTime() > (state.data.lastUpdated || 0) + (5 * 60 * 60 * 1000));
    }
  },
  actions: {
    async loadNewArticles(searchRequest: SearchRequest) {
      if (!this.getCanFetchArticles) return;

      this.data.lastUpdated = new Date().getTime();
      this.isLoading = true;
      this.error = undefined;

      try {
        const searchResponse = await NewsService.getArticles(searchRequest);

        if (searchResponse) {
          const articlesWithImage = searchResponse.data.filter(article => article.image);

          articlesWithImage.forEach(article => {
            preloadImageURL(article.image);
          });

          this.data.articles = articlesWithImage;
        }
      } catch (error) {
        this.error = error as Error;
        this.isLoading = false;
        throw error;
      }

      this.isLoading = false;
    }
  },
});