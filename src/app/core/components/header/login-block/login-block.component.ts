import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from 'app/auth/services/login.service';

@Component({
  selector: 'app-login-block',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './login-block.component.html',
  styleUrl: './login-block.component.scss',
})
export class LoginBlockComponent {
  logginState: boolean = false;

  loginService: LoginService;

  constructor(loginService: LoginService, private router: Router) {
    this.loginService = loginService;
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
