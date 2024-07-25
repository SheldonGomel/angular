import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly TOKEN_KEY = 'authTokenasdTRTWECDCcdf212245@#$';

  userName = '';

  login(credentials: { email: string; password: string }): Observable<void> {
    localStorage.setItem('fake-jwt-token', this.TOKEN_KEY);
    localStorage.setItem('email', credentials.email);
    this.userName = credentials.email;
    return of(undefined);
  }

  logout() {
    this.userName = '';
    localStorage.removeItem('fake-jwt-token');
    localStorage.removeItem('email');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('fake-jwt-token');
  }

  getUserName(): string {
    return localStorage.getItem('email') || '';
  }
}
