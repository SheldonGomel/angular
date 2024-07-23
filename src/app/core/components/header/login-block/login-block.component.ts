import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login-block',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './login-block.component.html',
  styleUrl: './login-block.component.scss',
})
export class LoginBlockComponent {

}
