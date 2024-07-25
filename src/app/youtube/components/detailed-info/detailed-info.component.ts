import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'app/youtube/models/search-result-item.model';
import { SearchService } from 'app/youtube/services/search.service';
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
  userId = '';

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
    private searchService: SearchService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id') || '';
    });
    this.searchService.getData().subscribe((data) => {
      const videoItems = data.filter((item) => item.id === this.userId);
      if (videoItems.length === 1) {
        [this.content] = videoItems;
        this.details.title = this.content.snippet.title;
        this.details.imgurl = this.content.snippet.thumbnails.maxres.url;
        this.details.likes = this.content.statistics.likeCount;
        this.details.dislikes = this.content.statistics.dislikeCount;
        this.details.views = this.content.statistics.viewCount;
        this.details.comments = this.content.statistics.commentCount;
        this.details.description = this.content.snippet.description;
        this.details.statusDate = new Date(this.content.snippet.publishedAt);
        this.details.date = this.details.statusDate.toLocaleString('en-US', {
          timeZoneName: undefined,
          timeZone: 'UTC',
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      }
    });
  }

  returnBack() {
    this.router.navigate(['/']);
  }
}
