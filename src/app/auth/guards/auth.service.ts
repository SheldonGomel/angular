import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): boolean {
    let loggedIn = false;
    this.loginService.isLoggedIn().subscribe((loggedInVal) => {
      if (!loggedInVal) this.router.navigate(['/login']);
      loggedIn = loggedInVal;
    });
    return loggedIn;
  }
}
