import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
} from '@angular/core';
import { StatusColors } from '../models/search-result-item.model';

@Directive({
  selector: '[appDateBackground]',
  standalone: true,
})
export class DateBackgroundDirective implements OnChanges {
  @Input() appDateBackground: Date = new Date();

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    this.updateBackgroundColor();
  }

  private updateBackgroundColor(): void {
    let backgroundColor: StatusColors;

    const currentDate = new Date().getTime();
    const publicationDate = new Date(this.appDateBackground).getTime();
    const day = 1000 * 60 * 60 * 24;
    const ageTimestamp = currentDate - publicationDate;
    if (ageTimestamp < 7 * day) {
      backgroundColor = 'blue';
    } else if (ageTimestamp < 30 * day) {
      backgroundColor = 'green';
    } else if (ageTimestamp < 6 * 30 * day) {
      backgroundColor = 'yellow';
    } else {
      backgroundColor = 'red';
    }
    this.renderer.setStyle(
      this.el.nativeElement,
      'backgroundColor',
      backgroundColor,
    );
  }
}
