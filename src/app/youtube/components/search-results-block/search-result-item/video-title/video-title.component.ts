import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-video-title',
  standalone: true,
  imports: [],
  templateUrl: './video-title.component.html',
  styleUrl: './video-title.component.scss',
})
export class VideoTitleComponent {
  @Input() title = 'Title';
}
