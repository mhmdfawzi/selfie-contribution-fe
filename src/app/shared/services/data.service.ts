// src/app/services/data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  setToken(token: string) {
    localStorage.setItem('burj_token', token);
  }

  setName(name: string) {
    localStorage.setItem('burj_contributor', name);
  }

  getName(): string | null {
    return localStorage.getItem('burj_contributor')
      ? localStorage.getItem('burj_contributor')
      : null;
  }
}
