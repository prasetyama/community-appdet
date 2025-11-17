import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EyeSlashIconComponent } from './shared/components/icons/icon-eye-slash';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EyeSlashIconComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  readonly signUpForm = this.fb.nonNullable.group({
    username: [''],
    email: [''],
    password: [''],
    confirmPassword: [''],
    acceptTerms: [false]
  });

  constructor(private readonly fb: FormBuilder) {}

  onSubmit(): void {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.getRawValue());
    }
  }

  toggleConfirmPasswordVisibility(): void {
    console.log('Toggling confirm password visibility');
    const input = document.getElementById('confirmPasswordInput') as HTMLInputElement;
    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  }

  togglePasswordVisibility(): void {
    const input = document.getElementById('passwordInput') as HTMLInputElement;
    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  }
}
