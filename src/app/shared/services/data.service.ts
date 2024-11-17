// src/app/services/data.service.ts
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  getCodeDigits() {
    // Simulate a delay of 1 second
    return of(true).pipe(delay(500));
  }
}
