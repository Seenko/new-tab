import { Article } from '@/services/news/models/Article'
import { UserInput } from '@/services/news/models/UserInput'

export interface SearchResponse {
  status: string;
  total_hits: number;
  page: number;
  total_pages: number;
  page_size: number;
  articles: Array<Article>;
  user_input: UserInput;
}