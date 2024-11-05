import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordComplexityValidator, passwordMatchValidator } from '../../../valid/custom-validators';
import { CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import intlTelInput from 'intl-tel-input';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup;
  @ViewChild('phone', { static: true }) phoneInput!: ElementRef;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      textInput: ['', Validators.required],
      phone: ['', Validators.required], 
      emailInput: ['', [Validators.required, Validators.email]],
      passwordInput: ['', [Validators.required, passwordComplexityValidator()]],
      confirmPasswordInput: ['', Validators.required]
    },
    { validators: passwordMatchValidator() }
  );
  }

  ngOnInit(): void {
    const input = this.phoneInput.nativeElement as HTMLInputElement;
    intlTelInput(input, {
      initialCountry: "auto",
      geoIpLookup: (callback: (countryCode: string) => void) => {
        fetch("https://ipinfo.io?token=<your_ipinfo_token>")
          .then((response) => response.json())
          .then((data) => {
            const countryCode = data.country ? data.country : "us";
            callback(countryCode);
          })
          .catch(() => {
            callback("us");
          });
      },
      loadUtilsOnInit: true,
      separateDialCode: true,
      preferredCountries: ["us", "gb", "ae"],
    } as any); 
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
    } else {
      this.myForm.markAllAsTouched();
    }
  }


}
