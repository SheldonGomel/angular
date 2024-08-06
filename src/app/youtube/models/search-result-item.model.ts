export interface Default {
  url: string;
  width: number;
  height: number;
}

export interface Medium {
  url: string;
  width: number;
  height: number;
}

export interface High {
  url: string;
  width: number;
  height: number;
}

export interface Standard {
  url: string;
  width: number;
  height: number;
}

export interface Maxres {
  url: string;
  width: number;
  height: number;
}

export interface Localized {
  title: string;
  description: string;
}

export interface Statistics {
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  favoriteCount: string;
  commentCount: string;
}

export interface Thumbnails {
  default: Default;
  medium: Medium;
  high: High;
  standard: Standard;
  maxres: Maxres;
}
export interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: Localized;
  defaultAudioLanguage: string;
  defaultLanguage?: string;
}

export interface Item {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  statistics: Statistics;
}

export interface SearchItem {
  kind: string;
  etag: string;
  id: { kind: string; videoId: string };
  snippet: Snippet;
}

export interface ResultItem {
  url: string;
  likes: string;
  dislikes: string;
  views: string;
  comments: string;
  date: string;
  title: string;
}

export type StatusColors = 'red' | 'green' | 'blue' | 'yellow';

export type DetailsCard = {
  title: string;
  imgurl: string;
  date: string;
  statusDate: Date;
  likes: string;
  dislikes: string;
  comments: string;
  views: string;
  description: string;
}
