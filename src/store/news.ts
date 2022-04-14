import { defineStore } from 'pinia'
import { useStorage, useNow, useOnline } from '@vueuse/core'

import { SearchResponse } from '@/services/news/models/SearchResponse'

import NewsService from '@/services/news'

interface News {
  articles: Array<any>;
  lastUpdated: number;
}

const defaultNews: News = {
  articles: [],
  lastUpdated: 0
}

export const useNewsStore = defineStore({
  id: 'news',
  state: () => ({
    news: useStorage('news', defaultNews),
    isLoading: false,
    error: undefined as Error | undefined
  }),
  getters: {
    getArticles(state) {
      return state.news.articles
    },
    getLastUpdated(state) {
      return state.news.lastUpdated
    },
    getCanFetchArticles(state) {
      const now = useNow()
      const isOnline = useOnline()

      return isOnline.value && (now.value.getTime() > (state.news.lastUpdated || 0) + (5 * 60 * 1000))
    },
    getError(state) {
      return state.error
    }
  },
  actions: {
    async loadNewArticles(q: string, page_size: number, page?: number) {
      if (!this.getCanFetchArticles) return

      this.news.lastUpdated = new Date().getTime()
      this.isLoading = true
      this.error = undefined

      try {
        const request = await NewsService.getArticles(q, page_size, page)

        const searchResponse: SearchResponse = request.data.value

        if (searchResponse.status === 'ok') {
          this.news.articles = searchResponse.articles
        }
      } catch (error) {
        this.error = error as Error
      }

      this.isLoading = false
    }
  },
})