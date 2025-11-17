import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
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
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    acceptTerms: [false, Validators.requiredTrue]
  }, { validators: this.passwordMatchValidator.bind(this) });
 
  isPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;

  isInvalid = false;
 
  constructor(private readonly fb: FormBuilder) {}
 
  onSubmit(): void {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
    console.log('Form Submitted', this.signUpForm.value);
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    if (password != null && confirmPassword != null && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
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
