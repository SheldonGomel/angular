import { Component } from '@angular/core';
import { DetailedInfoComponent } from 'app/youtube/components/detailed-info/detailed-info.component';

@Component({
  selector: 'app-detailed-info-page',
  standalone: true,
  imports: [DetailedInfoComponent],
  templateUrl: './detailed-info-page.component.html',
  styleUrl: './detailed-info-page.component.scss',
})
export class DetailedInfoPageComponent {

}
