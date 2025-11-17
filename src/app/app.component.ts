import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EyeSlashIconComponent } from './shared/components/icons/icon-eye-slash';
import { EyeIconComponent } from './shared/components/icons/icon-eye';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EyeSlashIconComponent, EyeIconComponent],
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

  isPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;

  constructor(private readonly fb: FormBuilder) {}

  onSubmit(): void {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.getRawValue());
    }
  }

  toggleConfirmPasswordVisibility() {
    const input = document.getElementById('confirmPasswordInput') as HTMLInputElement;
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
    input.type = this.isConfirmPasswordVisible ? 'text' : 'password';
  }

  togglePasswordVisibility() {
    const input = document.getElementById('passwordInput') as HTMLInputElement;
    this.isPasswordVisible = !this.isPasswordVisible;
    input.type = this.isPasswordVisible ? 'text' : 'password';
  }
}
