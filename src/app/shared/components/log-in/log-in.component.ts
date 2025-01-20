import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthComponent } from '../auth/auth.component';
import { WebSocketService } from 'src/app/shared/services/socket.service';
import { DataService } from '../../services/data.service';

import {
  CountryISO,
  NgxIntlTelInputModule,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input-gg';

export interface phoneObj {
  number: string;
  internationalNumber: string;
  nationalNumber: string;
  e164Number: string;
  countryCode: string;
  dialCode: string;
}

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthComponent,
    FormsModule,
    NgxIntlTelInputModule,
  ],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent {
  showPassword = false;
  isPhoneAccepted: boolean = false;
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.Egypt,
    CountryISO.UnitedArabEmirates,
  ];
  onlyCountries: CountryISO[] = [
    CountryISO.Egypt,
    CountryISO.UnitedArabEmirates,
  ];
  phoneForm = new FormGroup({
    phone: new FormControl(undefined, [Validators.required]),
  });

  changePreferredCountries() {
    this.preferredCountries = [CountryISO.Egypt, CountryISO.UnitedArabEmirates];
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private socketService: WebSocketService,
    private dataService: DataService
  ) {}

  navigateToAuth() {
    this.router.navigateByUrl('/auth');
  }

  onSubmit(): void {}

  navigateToRegister(): void {
    this.router.navigateByUrl('/register');
  }
  userMobileNumber: string | null = '';
  showAuth(): void {
    if (this.phoneForm.valid) {
      const phoneValue: phoneObj = this.phoneForm.get('phone')
        ?.value! as phoneObj; // Access the value
      console.log('Phone Value:', phoneValue);
      this.sendOtp(phoneValue.e164Number);
      this.userMobileNumber = phoneValue.e164Number;
      this.isPhoneAccepted = true;
    } else {
      console.error('Form is invalid');
    }
  }

  sendOtp(phone: string): void {
    this.socketService.sendOtp(phone).subscribe({
      next: (response: { info: string; name: string }) => {
        console.log('El response:', response);
        this.dataService.setName(response.name);
      },
      error: (err) => {
        console.error(' error:', err);
      },
    });
  }
}
