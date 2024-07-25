import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { SearchService } from 'app/youtube/services/search.service';
import { FilterInputComponent } from './filter-input/filter-input.component';
import { FilterButtonComponent } from './filter-button/filter-button.component';

@Component({
  selector: 'app-filtering-block',
  standalone: true,
  imports: [FilterInputComponent, FilterButtonComponent, NgIf],
  templateUrl: './filtering-block.component.html',
  styleUrl: './filtering-block.component.scss',
})
export class FilteringBlockComponent {
  filterCriteriaState = {
    date: 0,
    views: 0,
  };

  constructor(private searchService: SearchService) {}

  onSortByDateClick(): void {
    this.filterCriteriaState.views = 0;
    this.filterCriteriaState.date += 1;
    if (this.filterCriteriaState.date > 2) this.filterCriteriaState.date = 1;
    this.searchService.sortData(this.filterCriteriaState.date, 'date');
  }

  onSortByViewsClick(): void {
    this.filterCriteriaState.date = 0;
    this.filterCriteriaState.views += 1;
    if (this.filterCriteriaState.views > 2) this.filterCriteriaState.views = 1;
    this.searchService.sortData(this.filterCriteriaState.views, 'views');
  }
}
