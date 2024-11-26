import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Inject the Router service

  const token = localStorage.getItem('burj_token');
  if (token) {
    return true; // Allow access if the token exists
  } else {
    // Redirect to /login if no token
    router.navigate(['/login']);
    return false;
  }
};
