import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
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

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        tap((value) => {
          this.searchText = value;
        }),
        debounceTime(500),
        distinctUntilChanged(),
        filter((value) => value.length >= 3),
      )
      .subscribe((value) => {
        this.searchService.toggleVisibility();
        this.searchService.setSearchText(value);
      });
  }

  onPressEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.searchService.toggleVisibility();
      this.searchService.setSearchText(this.searchText);
    }
  }
}
