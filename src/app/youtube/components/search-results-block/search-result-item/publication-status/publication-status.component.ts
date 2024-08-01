import { Component, Input } from '@angular/core';
import { DateBackgroundDirective } from 'app/youtube/directives/date-background.directive';
import { StatusColors } from 'app/youtube/models/search-result-item.model';

@Component({
  selector: 'app-publication-status',
  standalone: true,
  imports: [DateBackgroundDirective],
  templateUrl: './publication-status.component.html',
  styleUrl: './publication-status.component.scss',
})
export class PublicationStatusComponent {
  color: StatusColors = 'red';

  @Input() date = new Date();
}
