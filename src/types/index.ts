export interface Facet {
  name: string;
  entries: {
    count: number;
    value: string;
  }[];
}

export interface SearchResponse {
  results: Result[];
  facets: Facet[];
  total: number;
  streaming_id: string;
  conversation_id: string;
}

export interface Result {
  id: string;
  content: [string];
  name: [string];
  url: [string];
}
