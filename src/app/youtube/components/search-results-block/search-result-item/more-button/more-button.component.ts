import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'app/youtube/models/search-result-item.model';

@Component({
  selector: 'app-more-button',
  standalone: true,
  imports: [],
  templateUrl: './more-button.component.html',
  styleUrl: './more-button.component.scss',
})
export class MoreButtonComponent {
  @Input() item: Item | undefined = undefined;

  constructor(private router: Router) {}

  showMore() {
    if (this.item) this.router.navigate(['more/', this.item.id]);
  }
}
