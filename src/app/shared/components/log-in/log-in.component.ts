import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {


  loginForm: FormGroup;
  showPassword = false;


  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, this.emailOrPhoneValidator]], 
      password: ['', Validators.required] 
    });
  }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted', this.loginForm.value);
    }
  }

  navigateToRegister() {
    this.router.navigateByUrl('/register')
  }
  navigateToAuth() {
    this.router.navigateByUrl('/auth')
  }

  emailOrPhoneValidator(control: any) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!control.value || emailRegex.test(control.value) || phoneRegex.test(control.value)) {
      return null;
    }
    return { emailOrPhone: true };
  }

}
