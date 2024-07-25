import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/youtube/services/videosdata.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { Item } from 'app/youtube/models/search-result-item.model';
import { FilterByTextPipe } from 'app/youtube/pipes/filter-by-text.pipe';
import { SearchService } from 'app/youtube/services/search.service';
import { Router } from '@angular/router';
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

  constructor(
    private http: DataService,
    private searchService: SearchService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.http.getData().subscribe((data) => {
      this.data = [...data.items];
      this.searchService.setData(this.data);
      // this.router.navigate(['/hero', 'Fdf5aTYRW0E']);
      // this.searchService.setSearchText(this.searchText);
    });
    this.searchService.getSearchText().subscribe((text) => {
      this.searchText = text;
    });
  }

  ngOnChanges() {
    this.searchService.getData().subscribe((data) => {
      this.data = data;
    });
  }
}
