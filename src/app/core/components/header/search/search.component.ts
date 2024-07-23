import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SearchService } from 'app/youtube/services/search.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  // @Output() submit = new EventEmitter<void>();

  // onSearchClick(): void {
  //   this.submit.emit();
  // }

  private searchService: SearchService;

  constructor(searchService: SearchService) {
    this.searchService = searchService;
  }

  onButtonClick(): void {
    this.searchService.toggleVisibility();
  }

  onDataSortClick(): void {
    this.searchService.toggleVisibility();
  }
}
