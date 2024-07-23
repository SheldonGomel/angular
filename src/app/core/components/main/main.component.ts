import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchResultsBlockComponent } from 'app/youtube/components/search-results-block/search-results-block.component';
import { SearchService } from 'app/youtube/services/search.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SearchResultsBlockComponent, NgIf, RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  isComponentVisible: boolean = false;

  searchService: SearchService;

  constructor(searchService: SearchService) {
    this.searchService = searchService;
  }

  ngOnInit(): void {
    this.searchService.getVisibility().subscribe((visible) => {
      this.isComponentVisible = visible;
    });
  }
}
