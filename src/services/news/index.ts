import axios, { AxiosInstance } from 'axios'
import { useAxios } from '@vueuse/integrations/useAxios'
import { SearchRequest } from './models/SearchRequest'

const BASE_URL = import.meta.env.PUBLIC_NEWS_API_ENDPOINT as string
const BASE_TOKEN = import.meta.env.PUBLIC_NEWS_API_TOKEN as string

let instance: AxiosInstance | null = null

const NewsService = {
  init: (token?: string) => {
    instance = axios.create({
      baseURL: BASE_URL,
      timeout: 5000,
      params: {
        'access_key':  token ? token : BASE_TOKEN
      }
    })
  },
  getArticles: (request: SearchRequest) => {
    return useAxios('/news', {
      method: 'GET',
      params: {
        sources: request.sources ? request.sources.join(',') : null,
        categories: request.categories ? request.categories.join(',') : null,
        countries: request.countries ? request.countries.join(',') : null,
        languages: request.languages ? request.languages.join(',') : null,
        keywords: request.keywords,
        date: request.date ? request.date.map(date => date.toISOString()).join(',') : null,
        sort: request.sort,
        limit: request.limit,
        offset: request.offset
      }
    }, instance as AxiosInstance)
  }
}

export default NewsService