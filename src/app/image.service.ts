// src/app/image.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiUrl = 'http://localhost:3000/images'; // Update to your backend API URL

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`http://localhost:3000/images/upload`, formData);
  }
  createCollage(file: File): Observable<any> {
    return this.http.post(`http://localhost:3000/collage/create`, {});
  }

  getCollage(): Observable<any> {
    return this.http.get(`http://localhost:3000/images/collage`);
  }
}
