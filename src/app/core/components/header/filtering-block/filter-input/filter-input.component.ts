import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from 'app/youtube/services/search.service';

@Component({
  selector: 'app-filter-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter-input.component.html',
  styleUrl: './filter-input.component.scss',
})
export class FilterInputComponent {
  searchText: string = '';

  constructor(private searchService: SearchService) {}

  onChange() {
    this.searchService.setSearchText(this.searchText);
  }
}
