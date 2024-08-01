import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { Router } from '@angular/router';
import { LoginService } from 'app/auth/services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  message = '';

  logStatus = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
  ) {
    this.loginForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.loginService.isLoggedIn().subscribe((val) => {
      this.logStatus = val;
    });
  }

  onChange(): void {
    this.message = '';
    if (this.loginForm.get('password')?.errors) {
      this.message = 'Password must have 6 symbols minimum';
    }
    if (this.loginForm.get('name')?.errors) {
      this.message = 'Name must have 3-32 symbols';
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value);
      this.router.navigate(['/']);
      return;
    }
    this.message = this.loginForm?.errors ? this.loginForm.errors[0] : '';
  }
}
