import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly TOKEN_KEY = 'authTokenasdTRTWECDCcdf212245@#$';

  userName = '';

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor() {
    const token = localStorage.getItem('fake-jwt-token');
    this.loggedIn.next(!!token);
  }

  login(credentials: { name: string; password: string }): void {
    localStorage.setItem('fake-jwt-token', this.TOKEN_KEY);
    localStorage.setItem('name', credentials.name);
    this.loggedIn.next(true);
  }

  logout(): void {
    localStorage.removeItem('fake-jwt-token');
    localStorage.removeItem('name');
    this.loggedIn.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getUserName(): string {
    return localStorage.getItem('name') || '';
  }
}
