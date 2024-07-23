import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-button',
  standalone: true,
  imports: [],
  templateUrl: './filter-button.component.html',
  styleUrl: './filter-button.component.scss',
})
export class FilterButtonComponent implements OnInit {
  filterState = '';

  @Input() criteria = '';

  @Input() state = 0;

  ngOnInit(): void {
    this.setState();
  }

  ngOnChanges(): void {
    this.setState();
  }

  private setState(): void {
    switch (this.state) {
      case 1:
        this.filterState = '▴▿';
        break;
      case 2:
        this.filterState = '▵▾';
        break;

      default:
        this.filterState = '▵▿';
        break;
    }
  }
}
