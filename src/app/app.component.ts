import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EyeSlashIconComponent } from './shared/components/icons/icon-eye-slash';
import { EyeIconComponent } from './shared/components/icons/icon-eye';
import { ActivatedRoute } from '@angular/router';
import { AlertsService } from './services/alerts.service';
import { CommunityApiComponent } from './features/api/community-api.component';
import { payloadNewReq } from './features/models';
import { AlertsComponent } from './shared/components/alerts/alerts.component';
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EyeSlashIconComponent, EyeIconComponent, AlertsComponent],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);

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
  channelId: string | null = null;

  isLoading: boolean = false;
  isSuccess: boolean = false;
 
  constructor(private readonly fb: FormBuilder, private alertService: AlertsService, private communityApi: CommunityApiComponent) {}

  ngOnInit(): void {
    const url = window.location.pathname;
    const parts = url.split('/');
    this.channelId = parts[2];
  }
 
  onSubmit(): void {
    this.isLoading = true;
    if (this.signUpForm.invalid) {
      this.isLoading = false;
      this.signUpForm.markAllAsTouched();
      return;
    }
    const payload: payloadNewReq = {
      channelId: this.channelId as string,
      username: this.signUpForm.value.username || '',
      email: this.signUpForm.value.email || '',
      password: this.signUpForm.value.password || '',
      mode: 'new',
    }
    this.communityApi.regisChannel(payload).then( res => {
      this.isLoading = false;
      if (res.isSuccess) {
        this.isSuccess = true;
        this.alertService.SetToast({type: 'success', message: 'Registration success'});
      } else {
        this.alertService.SetToast({type: 'error', message: `Registrasi Gagal : ${res.error.error.error.message}`});
      }
    });
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
