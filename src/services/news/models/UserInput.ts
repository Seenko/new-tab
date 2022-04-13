export interface UserInput {
  q: string;
  search_in: string;
  lang: string;
  country: string;
  from: string;
  to: string;
  ranked_only: boolean;
  from_rank: number;
  to_rank: number;
  sort_by: string;
  page: number;
  size: number;
  sources: string;
  not_sources: string;
  topic: string;
}