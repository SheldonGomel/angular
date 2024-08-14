import { NgFor } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgFor],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() totalItems: number = 0;

  @Input() itemsPerPage: number = 20;

  @Input() currentPage: number = 1;

  @Output() pageChanged = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((x, i) => i + 1);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChanged.emit(page);
    }
  }
}
