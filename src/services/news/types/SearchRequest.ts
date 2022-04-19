export interface SearchRequest {
  keywords: string;
  languages: Array<string>;
  sort: 'published_desc' | 'published_asc' | 'popularity';
  sources: Array<string>;
  categories: Array<string>;
  countries: Array<string>;
  date: Array<Date>;
  limit: number;
  offset: number;
}