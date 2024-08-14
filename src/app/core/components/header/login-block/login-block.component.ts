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

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loginService.isLoggedIn().subscribe((val) => {
      this.logginState = val;
    });
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login', {}]);
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  get getUserName(): string {
    return this.loginService.getUserName();
  }

  goToAdminPage(): void {
    this.router.navigate(['/admin']);
  }

  goToFavoritePage(): void {
    this.router.navigate(['/fav']);
  }
}
