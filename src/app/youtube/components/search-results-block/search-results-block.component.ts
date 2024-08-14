import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/youtube/services/videosdata.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { Item } from 'app/youtube/models/search-result-item.model';
import { FilterByTextPipe } from 'app/youtube/pipes/filter-by-text.pipe';
import { SearchService } from 'app/youtube/services/search.service';
import { Observable, Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import {
  selectTotalVideos,
  selectVideosForCurrentPage,
} from 'app/redux/selectors/app.selector';
import { AppState } from 'app/redux/reducers/app.reducer';
import { addApiVideo, setApiVideos } from 'app/redux/actions/apiVideo.action';
import { addCustomVideo } from 'app/redux/actions/customVideo.action';
import { UtilsService } from 'app/youtube/services/utils.service';
import { SearchResultItemComponent } from './search-result-item/search-result-item.component';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-search-results-block',
  standalone: true,
  imports: [
    SearchResultItemComponent,
    NgFor,
    FilterByTextPipe,
    AsyncPipe,
    PaginationComponent,
  ],
  providers: [DataService, UtilsService],
  templateUrl: './search-results-block.component.html',
  styleUrl: './search-results-block.component.scss',
})
export class SearchResultsBlockComponent implements OnInit {
  searchText: string = '';

  searchSubscription$ = new Subscription();

  errorMessage = '';

  // videos$ = this.store.select(selectAllCustomVideos);

  data: Item[] = [];

  itemsPerPage: number = 8;

  currentPage: number = 1;

  videos$: Observable<Item[]> = new Observable();

  totalVideos$: Observable<number> = new Observable();

  constructor(
    private searchService: SearchService,
    private store: Store<AppState>,
    private utils: UtilsService
  ) {
    this.loadVideosForPage(this.currentPage);
  }

  ngOnInit(): void {
    this.totalVideos$ = this.store.select(selectTotalVideos);
    this.searchSubscription$ = this.searchService
      .getSearchText()
      .subscribe((text) => {
        this.searchText = text;
        try {
          // this.http.searchData(this.searchText);
        } catch (err) {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 0) {
              this.errorMessage = 'A client-side or network error occurred.';
            } else {
              this.errorMessage = `Backend returned error code ${err.status} ${err.error.error.message} `;
            }
          }
        }
      });
  }

  ngOnDestroy() {
    this.searchSubscription$.unsubscribe();
  }

  generateCustomVideo() {
    const video: Item = {
      kind: 'youtube#searchResult',
      etag: 'rb5LI8L3acjhNvJrMWvkr-jS7Dk',
      id: 'i2SbZD26xIc',
      snippet: {
        publishedAt: '2024-08-08T16:00:45Z',
        channelId: 'UCIJ6Spc2ooTRcb0EKcAOejA',
        title:
          'Emil TRF, Mishell, JS - Bez Men / Без Мен (Official Visualizer)',
        description:
          'Official Visualizer for "Bez Men" by Emil TRF, Mishell, JS ▻ Stream and download on: https://saucekids.bfan.link/bez-men ...',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/i2SbZD26xIc/default.jpg',
            width: 120,
            height: 90,
          },
          medium: {
            url: 'https://i.ytimg.com/vi/i2SbZD26xIc/mqdefault.jpg',
            width: 320,
            height: 180,
          },
          high: {
            url: 'https://i.ytimg.com/vi/i2SbZD26xIc/hqdefault.jpg',
            width: 480,
            height: 360,
          },
          maxres: {
            url: 'https://i.ytimg.com/vi/i2SbZD26xIc/hqdefault.jpg',
            width: 480,
            height: 360,
          },
          standard: undefined,
        },
        channelTitle: 'Emil TRF',
        liveBroadcastContent: 'none',
        tags: [],
        categoryId: '',
        localized: {
          title: '',
          description: '',
        },
        defaultAudioLanguage: '',
      },
      statistics: {
        viewCount: this.utils.randomNumber(5),
        likeCount: this.utils.randomNumber(5),
        dislikeCount: this.utils.randomNumber(5),
        favoriteCount: '0',
        commentCount: this.utils.randomNumber(5),
      },
      type: 'custom',
    };
    console.log('click');
    this.store.dispatch(
      addCustomVideo({
        customVideo: { ...video, id: this.utils.randomString(10) },
      })
    );
  }

  generateApiVideo() {
    const video: Item = {
      kind: 'youtube#searchResult',
      etag: 'rb5LI8L3acjhNvJrMWvkr-jS7Dk',
      id: 'i2SbZD26xIc',
      snippet: {
        publishedAt: '2024-08-08T16:00:45Z',
        channelId: 'UCIJ6Spc2ooTRcb0EKcAOejA',
        title:
          'Emil TRF, Mishell, JS - Bez Men / Без Мен (Official Visualizer)',
        description:
          'Official Visualizer for "Bez Men" by Emil TRF, Mishell, JS ▻ Stream and download on: https://saucekids.bfan.link/bez-men ...',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/i2SbZD26xIc/default.jpg',
            width: 120,
            height: 90,
          },
          medium: {
            url: 'https://i.ytimg.com/vi/i2SbZD26xIc/mqdefault.jpg',
            width: 320,
            height: 180,
          },
          high: {
            url: 'https://i.ytimg.com/vi/i2SbZD26xIc/hqdefault.jpg',
            width: 480,
            height: 360,
          },
          maxres: {
            url: 'https://i.ytimg.com/vi/i2SbZD26xIc/hqdefault.jpg',
            width: 480,
            height: 360,
          },
          standard: undefined,
        },
        channelTitle: 'Emil TRF',
        liveBroadcastContent: 'none',
        tags: [],
        categoryId: '',
        localized: {
          title: '',
          description: '',
        },
        defaultAudioLanguage: '',
      },
      statistics: {
        viewCount: this.utils.randomNumber(5),
        likeCount: this.utils.randomNumber(5),
        dislikeCount: this.utils.randomNumber(5),
        favoriteCount: '0',
        commentCount: this.utils.randomNumber(5),
      },
      type: 'custom',
    };
    console.log('click');
    this.store.dispatch(
      addApiVideo({
        apiVideo: { ...video, id: this.utils.randomString(10), type: 'api' },
      })
    );
  }

  loadVideosForPage(page: number) {
    this.videos$ = this.store.select(
      selectVideosForCurrentPage(page, this.itemsPerPage)
    );
  }

  onPageChanged(page: number) {
    this.currentPage = page;
    this.loadVideosForPage(page);
  }
}
