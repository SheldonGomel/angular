import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { requestApiVideos } from 'app/redux/actions/apiVideo.action';
import { AppState } from 'app/redux/reducers/app.reducer';
import { SearchService } from 'app/youtube/services/search.service';
import {
  debounceTime,
  filter,
  distinctUntilChanged,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  searchText = '';

  searchControl = new FormControl();

  minCharsToSearch = 3;

  constructor(
    private searchService: SearchService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        tap((value) => {
          this.searchText = value;
        }),
        debounceTime(500),
        distinctUntilChanged(),
        filter((value) => value.length >= this.minCharsToSearch)
      )
      .subscribe((value) => {
        this.store.dispatch(requestApiVideos({ query: value }));
        this.searchService.toggleVisibility();
      });
  }

  onPressEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.store.dispatch(requestApiVideos({ query: this.searchText }));
      this.searchService.toggleVisibility();
    }
  }
}
