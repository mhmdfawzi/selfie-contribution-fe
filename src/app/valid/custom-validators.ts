import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get('passwordInput')?.value;
    const confirmPassword = formGroup.get('confirmPasswordInput')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  };
}

export function passwordComplexityValidator() {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);

    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      return { passwordComplexity: true };
    }
    return null;
  };
}