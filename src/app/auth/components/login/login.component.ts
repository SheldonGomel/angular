import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
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

  logStatus = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
  ) {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordStrengthValidator]],
    });
  }

  ngOnInit(): void {
    this.loginService.isLoggedIn().subscribe((val) => {
      this.logStatus = val;
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value);
      this.router.navigate(['/']);
    }
  }

  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const { value } = control;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecial = /[!@#?$%^&*(),.?":{}|<>]/.test(value);
    const isValidLength = value.length >= 8;

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial && isValidLength;

    if (!passwordValid) {
      return {
        passwordStrength:
          "Your password isn't strong enough. Ensure it has at least 8 characters, upper and lowercase letters, numbers and at least one special character.",
      };
    }
    return null;
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    if (control) return control.invalid && control.touched;
    return false;
  }

  getErrorMessage(controlName: string): string {
    const errors = this.loginForm.get(controlName)?.errors;
    if (errors) {
      if (errors['required']) {
        switch (controlName) {
          case 'email':
            return 'Please enter a email';
          case 'password':
            return 'Please enter a password';
          default:
            return 'This field is required';
        }
      }
      if (errors['email']) {
        return 'Email is not valid';
      }
      if (errors['minlength']) {
        return `The ${controlName} is too short`;
      }

      if (errors['maxlength']) {
        return `The ${controlName} is too long`;
      }
      if (errors['passwordStrength']) {
        return "Your password isn't strong enough. Ensure it has at least 8 characters, upper and lowercase letters, numbers and at least one special character.";
      }
    }
    return '';
  }
}
