import { Item, SearchItem } from './search-result-item.model';

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface Results {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: Item[];
}

export interface SearchResults {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: SearchItem[];
}
