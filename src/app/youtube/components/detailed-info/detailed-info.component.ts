import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsCard, Item } from 'app/youtube/models/search-result-item.model';
import { DataService } from 'app/youtube/services/videosdata.service';
import { Store } from '@ngrx/store';
import { AppState } from 'app/redux/reducers/app.reducer';
import { emptyCard } from 'app/redux/selectors/customVideo.selector';
import { selectVideoById } from 'app/redux/selectors/app.selector';
import { delteCustomVideo } from 'app/redux/actions/customVideo.action';
import { toggleApiVideoFavorite } from 'app/redux/actions/apiVideo.action';
import { Subscription } from 'rxjs';
import { CommentsCountComponent } from '../search-results-block/search-result-item/comments-count/comments-count.component';
import { ViewsCountComponent } from '../search-results-block/search-result-item/views-count/views-count.component';
import { LikesCountComponent } from '../search-results-block/search-result-item/likes-count/likes-count.component';
import { DislikesCountComponent } from '../search-results-block/search-result-item/dislikes-count/dislikes-count.component';
import { PublicationStatusComponent } from '../search-results-block/search-result-item/publication-status/publication-status.component';

@Component({
  selector: 'app-detailed-info',
  standalone: true,
  imports: [
    CommentsCountComponent,
    ViewsCountComponent,
    LikesCountComponent,
    DislikesCountComponent,
    PublicationStatusComponent,
  ],
  templateUrl: './detailed-info.component.html',
  styleUrl: './detailed-info.component.scss',
})
export class DetailedInfoComponent implements OnInit {
  videoId = '';

  content: Item | null = null;

  details: DetailsCard = emptyCard;

  subscription: Subscription = new Subscription();

  type?: 'custom' | 'api';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: DataService,
    private store: Store<AppState>
  ) {
    // this.details = this.http.detailsDataSignal();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.videoId = id;
        // this.http.getDetailedData(id);
        const video$ = this.store.select(selectVideoById(id));
        this.subscription = video$.subscribe((videoData) => {
          this.details = videoData.videoDetails;
          this.type = videoData.type;
        });
      }
    });
  }

  returnBack() {
    this.subscription.unsubscribe();
    this.router.navigate(['/']);
  }

  toggleFavorite() {
    this.store.dispatch(toggleApiVideoFavorite({ id: this.videoId }));
  }

  onDelete() {
    this.subscription.unsubscribe();
    this.store.dispatch(delteCustomVideo({ id: this.videoId }));
    this.router.navigate(['/']);
  }
  // get details():DetailsCard {
  //   return this.http.detailsDataSignal();
  // }
}
