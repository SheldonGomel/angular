import { Component } from '@angular/core';
import { CardCreationComponent } from 'app/auth/components/card-creation/card-creation.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CardCreationComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
})
export class AdminPageComponent {

}
