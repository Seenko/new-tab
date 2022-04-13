import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

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
    isLoading: false
  }),
  getters: {
    getArticles(state) {
      return state.news.articles
    },
    getLastUpdated(state) {
      return state.news.lastUpdated
    },
    getCanFetchArticles(state) {
      return (Date.now() > (state.news.lastUpdated || 0) + (5 * 60 * 1000))
    }
  },
  actions: {
    async loadNewArticles() {
      if (Date.now() < this.getLastUpdated + (5 * 60 * 1000)) return

      this.news.lastUpdated = new Date().getTime()
      this.isLoading = true

      const request = await NewsService.getArticles('a', 4)

      if (request.finished) {
        const searchResponse: SearchResponse = request.data.value

        if (searchResponse.status === 'ok') {
          this.news.articles = searchResponse.articles
        }
      }

      this.isLoading = false
    }
  },
})