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

  // ngOnInit(): void {
  //   this.setButtonColor();
  // }

  // ngOnChanges(): void {
  //   this.setButtonColor();
  // }

  // private setButtonColor(): void {
  //   const currentDate = new Date().getTime();
  //   const publicationDate = new Date(this.date).getTime();
  //   const day = 1000 * 60 * 60 * 24;
  //   const ageTimestamp = currentDate - publicationDate;
  //   if (ageTimestamp < 7 * day) {
  //     this.color = '$filter-button-color';
  //   } else if (ageTimestamp < 30 * day) {
  //     this.color = 'green';
  //   } else if (ageTimestamp < 6 * 30 * day) {
  //     this.color = 'yellow';
  //   } else {
  //     this.color = 'red';
  //   }
  // }
}
