import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Results,
  SearchResults,
} from 'app/youtube/models/search-results-block.model';
import { DetailsCard, Item } from '../models/search-result-item.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private youTubeApiUrl = 'https://www.googleapis.com/youtube/v3/videos';

  private searchApiUrl = 'https://www.googleapis.com/youtube/v3/search';

  constructor(private http: HttpClient) {}

  private detailsInit: DetailsCard = {
    title: '',
    imgurl: '',
    date: 'soon',
    statusDate: new Date(),
    likes: '',
    dislikes: '',
    comments: '',
    views: '',
    description: '',
  };

  // searchResultsSignal: WritableSignal<string> = signal('');

  videosDataSignal: WritableSignal<Item[] | []> = signal([]);

  detailsDataSignal: WritableSignal<DetailsCard> = signal(this.detailsInit);

  searchData(searchText: string): void {
    const search$ = this.http.get<SearchResults>(this.searchApiUrl, {
      params: { q: searchText },
    });
    search$.subscribe((searchData) => {
      const ids = searchData.items.map((item) => item.id.videoId);
      if (ids.length) {
        this.getData(ids.join(','));
      }
    });
  }

  getData(ids: string): void {
    const getData$ = this.http.get<Results>(this.youTubeApiUrl, {
      params: { id: ids },
    });
    getData$.subscribe((videoData) => {
      const data = [...videoData.items];
      this.videosDataSignal.set(data);
    });
  }

  getDetailedData(id: string): void {
    const getDetailedData$ = this.http.get<Results>(this.youTubeApiUrl, {
      params: { id },
    });
    getDetailedData$.subscribe((data) => {
      const [content] = [...data.items];
      const publishedAt = new Date(content.snippet.publishedAt);
      const details = {
        title: content.snippet.title,
        imgurl: content.snippet.thumbnails.maxres
          ? content.snippet.thumbnails.maxres.url
          : content.snippet.thumbnails.high.url,
        likes: content.statistics.likeCount,
        dislikes: content.statistics.dislikeCount,
        views: content.statistics.viewCount,
        comments: content.statistics.commentCount,
        description: content.snippet.description,
        statusDate: publishedAt,
        date: publishedAt.toLocaleString('en-US', {
          timeZoneName: undefined,
          timeZone: 'UTC',
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      };
      this.detailsDataSignal.set(details);
    });
  }
}
