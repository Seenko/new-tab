export interface LocationSearchRequest {
  q: string;
  limit?: number;
  viewbox?: Array<string>;
  bounded?: boolean;
  countrycodes?: Array<string>;
  json_callback?: string;
  normalizecity?: boolean;
  'accept-language'?: Array<string>;
  tag?: Array<string>;
  dedupe?: boolean;
  importancesort?: boolean;
}