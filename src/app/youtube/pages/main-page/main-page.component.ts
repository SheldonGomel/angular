import { Component } from '@angular/core';
import { MainComponent } from 'app/youtube/components/main/main.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [MainComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {}
