import { Component, Input } from '@angular/core';
import { DateBackgroundDirective } from 'app/youtube/directives/date-background.directive';

@Component({
  selector: 'app-publication-status',
  standalone: true,
  imports: [DateBackgroundDirective],
  templateUrl: './publication-status.component.html',
  styleUrl: './publication-status.component.scss',
})
export class PublicationStatusComponent {
  color = 'red';

  @Input() date = new Date();
}
