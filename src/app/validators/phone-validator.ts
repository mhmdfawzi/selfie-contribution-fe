import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';

/**
 * Validator to validate phone numbers.
 * @param countryCode - The default country code for validation (e.g., 'US', 'IN', etc.).
 * @returns A ValidatorFn for Angular forms.
 */
export function phoneValidator(countryCode: CountryCode = 'US'): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // Allow empty values (use `Validators.required` for required fields)
    }

    const phoneNumber = parsePhoneNumberFromString(control.value, countryCode);

    if (!phoneNumber || !phoneNumber.isValid()) {
      return { invalidPhone: true }; // Return an error if the phone number is invalid
    }

    return null; // Return null if the phone number is valid
  };
}
