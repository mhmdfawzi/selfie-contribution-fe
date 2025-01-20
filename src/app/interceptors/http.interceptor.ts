import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router); // Use Angular's `inject` to get the Router

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        console.error('Unauthorized (401)');
        // alert('You are not authorized. Please log in.');
        router.navigate(['/login']); // Redirect to login page
      } else if (error.status === 403) {
        console.error('Forbidden (403)');
        // alert('Access denied. You do not have permission.');
      } else if (error.status === 404) {
        console.error('Not Found (404)');
        // alert('The requested resource was not found.');
      } else if (error.status === 500) {
        console.error('Internal Server Error (500)');
        // alert('A server error occurred. Please try again later.');
      } else {
        console.error(`Unexpected Error: ${error.message}`);
        // alert('An unexpected error occurred.');
      }

      return throwError(() => new Error(error.message));
    })
  );
};
