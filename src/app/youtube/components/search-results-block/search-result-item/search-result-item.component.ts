import {
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { Item } from 'app/youtube/models/search-result-item.model';
import { CommentsCountComponent } from './comments-count/comments-count.component';
import { DislikesCountComponent } from './dislikes-count/dislikes-count.component';
import { LikesCountComponent } from './likes-count/likes-count.component';
import { MoreButtonComponent } from './more-button/more-button.component';
import { VideoThumbnailComponent } from './video-thumbnail/video-thumbnail.component';
import { VideoTitleComponent } from './video-title/video-title.component';
import { ViewsCountComponent } from './views-count/views-count.component';
import { PublicationStatusComponent } from './publication-status/publication-status.component';

@Component({
  selector: 'app-search-result-item',
  standalone: true,
  imports: [
    VideoThumbnailComponent,
    ViewsCountComponent,
    LikesCountComponent,
    DislikesCountComponent,
    CommentsCountComponent,
    VideoTitleComponent,
    MoreButtonComponent,
    PublicationStatusComponent,
  ],
  templateUrl: './search-result-item.component.html',
  styleUrl: './search-result-item.component.scss',
})
export class SearchResultItemComponent implements OnInit, OnChanges {
  url = '';

  likes = '0';

  dislikes = '0';

  views = '0';

  comments = '0';

  date = new Date();

  title = '';

  @Input() item: Item | null = null;

  ngOnInit(): void {
    this.setDate();
  }

  ngOnChanges(): void {
    this.setDate();
  }

  setDate() {
    this.date = new Date(this.item!.snippet.publishedAt);
    this.url = this.item!.snippet.thumbnails.medium.url;
    this.title = this.item!.snippet.title;
    this.likes = this.item!.statistics.likeCount;
    this.dislikes = this.item!.statistics.dislikeCount;
    this.views = this.item!.statistics.viewCount;
    this.comments = this.item!.statistics.commentCount;
  }
}
