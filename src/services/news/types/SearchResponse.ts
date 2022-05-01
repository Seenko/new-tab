import { Pagination } from '@/services/news/types/Pagination';
import { Article } from '@/services/news/types/Article';

export interface SearchResponse {
  pagination: Pagination;
  data: Array<Article>;
}