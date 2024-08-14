import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Results,
  SearchResults,
} from 'app/youtube/models/search-results-block.model';
import { Store } from '@ngrx/store';
import { AppState } from 'app/redux/reducers/app.reducer';
import { setApiVideos } from 'app/redux/actions/apiVideo.action';
import { DetailsCard, Item } from '../models/search-result-item.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private youTubeApiUrl = 'https://www.googleapis.com/youtube/v3/videos';

  private searchApiUrl = 'https://www.googleapis.com/youtube/v3/search';

  constructor(private http: HttpClient, private store: Store<AppState>) {}

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
    favorite: false,
  };

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

  getData(ids: string) {
    this.http
      .get<Results>(this.youTubeApiUrl, {
        params: { id: ids },
      })
      .subscribe((videos) => {
        this.store.dispatch(setApiVideos({ apiVideos: videos.items }));
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
        favorite: content.favorite ?? false,
      };
      this.detailsDataSignal.set(details);
    });
  }
}
