import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/youtube/services/videosdata.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { Item } from 'app/youtube/models/search-result-item.model';
import { FilterByTextPipe } from 'app/youtube/pipes/filter-by-text.pipe';
import { SearchService } from 'app/youtube/services/search.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchResultItemComponent } from './search-result-item/search-result-item.component';

@Component({
  selector: 'app-search-results-block',
  standalone: true,
  imports: [SearchResultItemComponent, NgFor, FilterByTextPipe, AsyncPipe],
  providers: [DataService],
  templateUrl: './search-results-block.component.html',
  styleUrl: './search-results-block.component.scss',
})
export class SearchResultsBlockComponent implements OnInit {
  data: Item[] = [];

  searchText: string = '';

  searchSubscription$ = new Subscription();

  errorMessage = '';

  constructor(
    private http: DataService,
    private searchService: SearchService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.searchSubscription$ = this.searchService
      .getSearchText()
      .subscribe((text) => {
        this.searchText = text;
        this.http.searchData(this.searchText).subscribe(
          (searchData) => {
            const ids = searchData.items.map((item) => item.id.videoId);
            this.http.getData(ids.join(',')).subscribe((videoData) => {
              this.data = [...videoData.items];
              this.searchService.setData(this.data);
            });
          },
          (err) => {
            if (err.status === 0) {
              this.errorMessage = 'A client-side or network error occurred.';
            } else {
              this.errorMessage = `Backend returned error code ${err.status} ${err.error.error.message} `;
            }
          },
        );
      });
  }

  ngOnDestroy() {
    this.searchSubscription$.unsubscribe();
  }
}
