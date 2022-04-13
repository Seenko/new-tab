import axios, { AxiosInstance } from 'axios'
import { useAxios } from '@vueuse/integrations/useAxios'

const BASE_URL = import.meta.env.PUBLIC_NEWS_API_ENDPOINT as string
const BASE_TOKEN = import.meta.env.PUBLIC_NEWS_API_TOKEN as string

let instance: AxiosInstance | null = null

const NewsService = {
  init: (token?: string) => {
    instance = axios.create({
      baseURL: BASE_URL,
      timeout: 5000,
      headers: {
        'X-RapidAPI-Host': new URL(BASE_URL).hostname,
        'X-RapidAPI-Key': token ? token : BASE_TOKEN
      }
    })
  },
  getArticles: (q: string, page_size: number, page?: number, lang: string = 'en') => useAxios('/search', {
    method: 'GET',
    params: {
      q,
      page_size,
      page,
      lang
    }
  }, instance as AxiosInstance)
}

export default NewsService