import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
}
