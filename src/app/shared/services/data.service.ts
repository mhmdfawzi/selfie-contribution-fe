// src/app/services/data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  setToken(token: string){
    localStorage.setItem('burj_token', token)
  }


}
