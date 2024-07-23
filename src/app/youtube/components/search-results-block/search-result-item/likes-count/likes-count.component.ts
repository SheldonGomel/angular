import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-likes-count',
  standalone: true,
  imports: [],
  templateUrl: './likes-count.component.html',
  styleUrl: './likes-count.component.scss',
})
export class LikesCountComponent {
  @Input() count = '0';
}
