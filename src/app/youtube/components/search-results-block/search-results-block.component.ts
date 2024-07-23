import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/youtube/services/videosdata.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { Item } from 'app/youtube/models/search-result-item.model';
import { FilterByTextPipe } from 'app/youtube/pipes/filter-by-text.pipe';
import { SearchService } from 'app/youtube/services/search.service';
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

  http: DataService;

  searchText:string = '';

  searchService: SearchService;

  constructor(http: DataService, searchService: SearchService) {
    this.http = http;
    this.searchService = searchService;
    this.data = [];
  }

  ngOnInit(): void {
    this.http.getData().subscribe((data) => {
      this.data = [...data.items];
      this.searchService.setData(this.data);
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
