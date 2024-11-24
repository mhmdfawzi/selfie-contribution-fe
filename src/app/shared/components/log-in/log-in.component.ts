import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthComponent } from '../auth/auth.component';
import { WebSocketService } from 'src/app/shared/services/socket.service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AuthComponent],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent {
  loginForm: FormGroup;
  showPassword = false;
  isPhoneAccepted: boolean = false;

  // constructor(private fb: FormBuilder, private router: Router) {
  //   this.loginForm = this.fb.group({
  //     email: ['', [Validators.required, this.emailOrPhoneValidator]],
  //     password: ['', Validators.required]
  //   });
  // }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private socketService: WebSocketService
  ) {
    this.loginForm = this.fb.group({
      mobileNumber: ['', [Validators.required, this.phoneValidator]],
    });
  }

  get userPhoneNumber() {
    return this.loginForm.get('mobileNumber')?.value || '';
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  navigateToAuth() {
    this.router.navigateByUrl('/auth');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form Submitted', this.loginForm.value);
    }
  }

  navigateToRegister(): void {
    this.router.navigateByUrl('/register');
  }

  showAuth(): void {
    // this.router.navigateByUrl('/auth')
    this.isPhoneAccepted = true;
    this.sendOtp();
  }

  sendOtp(): void {
    this.socketService.sendOtp(this.userPhoneNumber).subscribe({
      next: (response) => {
        console.log('El response:', response);
      },
      error: (err) => {
        console.error(' error:', err);
      },
    });
  }

  phoneValidator(control: any) {
    const phoneRegex = /^[0-9]{11}$/; // Allow exactly 11 digits
    if (!control.value || phoneRegex.test(control.value)) {
      return null;
    }
    return { phone: true }; // Return an error object if validation fails
  }

  // emailOrPhoneValidator(control: any) {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   const phoneRegex = /^[0-9]{10,15}$/;
  //   if (!control.value || emailRegex.test(control.value) || phoneRegex.test(control.value)) {
  //     return null;
  //   }
  //   return { emailOrPhone: true };
  // }
}
