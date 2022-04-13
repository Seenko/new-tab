export interface Article {
  title: string;
  author: string;
  published_date: Date;
  published_date_precision: string;
  link: URL;
  clean_url: string;
  summary: string;
  rights: string;
  rank: number;
  topic: string;
  country: string;
  language: string;
  authors: Array<any>;
  media: URL;
  is_opinion: boolean;
  twitter_account: string;
  _score: number;
  _id: string;
}