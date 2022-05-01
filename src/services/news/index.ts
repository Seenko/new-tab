import type { SearchRequest } from '@/services/news/types/SearchRequest';
import type { SearchResponse } from '@/services/news/types/SearchResponse';

import axios, { AxiosInstance } from 'axios';

const BASE_URL = import.meta.env.PUBLIC_NEWS_API_ENDPOINT as string;
const BASE_TOKEN = import.meta.env.PUBLIC_NEWS_API_TOKEN as string;

let instance: AxiosInstance;

const NewsService = {
  init: (token?: string) => {
    instance = axios.create({
      baseURL: BASE_URL,
      timeout: 5000,
      params: {
        'access_key':  token ? token : BASE_TOKEN
      }
    });
  },
  getArticles: (request: SearchRequest): Promise<SearchResponse> => {
    return instance.get('/news',
      {
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
      }).then(response => response.data);
  }
};

export default NewsService;