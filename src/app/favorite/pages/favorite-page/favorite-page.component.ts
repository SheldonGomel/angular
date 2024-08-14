import { Component } from '@angular/core';
import { FavoriteComponentComponent } from 'app/favorite/components/favorite-component/favorite-component.component';

@Component({
  selector: 'app-favorite-page',
  standalone: true,
  imports: [FavoriteComponentComponent],
  templateUrl: './favorite-page.component.html',
  styleUrl: './favorite-page.component.scss',
})
export class FavoritePageComponent {

}
