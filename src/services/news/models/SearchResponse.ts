import { Pagination } from '@/services/news/models/Pagination'
import { Article } from '@/services/news/models/Article'

export interface SearchResponse {
  pagination: Pagination;
  data: Array<Article>;
}