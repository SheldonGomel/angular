import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'app/redux/reducers/app.reducer';
import { selectFavoriteVideos } from 'app/redux/selectors/app.selector';
import { SearchResultItemComponent } from 'app/youtube/components/search-results-block/search-result-item/search-result-item.component';
import { Item } from 'app/youtube/models/search-result-item.model';

@Component({
  selector: 'app-favorite-component',
  standalone: true,
  imports: [SearchResultItemComponent, RouterLink],
  templateUrl: './favorite-component.component.html',
  styleUrl: './favorite-component.component.scss',
})
export class FavoriteComponentComponent {
  favoriteVideos: Item[] = [];

  constructor(private store: Store<AppState>, private router: Router) {
    const videos$ = this.store.select(selectFavoriteVideos);
    videos$.subscribe((videosData) => {
      this.favoriteVideos = videosData;
    });
  }
}
