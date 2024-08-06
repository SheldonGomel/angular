import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsCard, Item } from 'app/youtube/models/search-result-item.model';
import { DataService } from 'app/youtube/services/videosdata.service';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: DataService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.videoId = id;
        this.http.getDetailedData(id);
      }
    });
  }

  returnBack() {
    this.router.navigate(['/']);
  }

  get details():DetailsCard {
    return this.http.detailsDataSignal();
  }
}
