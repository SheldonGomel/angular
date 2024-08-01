import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'app/youtube/models/search-result-item.model';
import { DataService } from 'app/youtube/services/videosdata.service';
import { switchMap } from 'rxjs';
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

  details = {
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: DataService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.videoId = params.get('id') || '';
          return this.http.getDetailedData(this.videoId);
        }),
      )
      .subscribe((data) => {
        [this.content] = [...data.items];
        this.details = {
          title: this.content.snippet.title,
          imgurl: this.content.snippet.thumbnails.maxres
            ? this.content.snippet.thumbnails.maxres.url
            : this.content.snippet.thumbnails.high.url,
          likes: this.content.statistics.likeCount,
          dislikes: this.content.statistics.dislikeCount,
          views: this.content.statistics.viewCount,
          comments: this.content.statistics.commentCount,
          description: this.content.snippet.description,
          statusDate: new Date(this.content.snippet.publishedAt),
          date: this.details.statusDate.toLocaleString('en-US', {
            timeZoneName: undefined,
            timeZone: 'UTC',
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        };
      });
  }

  returnBack() {
    this.router.navigate(['/']);
  }
}
