// src/app/image.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createApi } from 'unsplash-js';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiUrl = `${environment.apiUrl}`; // Update to your backend API URL

  constructor(private http: HttpClient) {}
  // on your node server
  serverApi = createApi({
    accessKey: 'ICPmSUAIK01n3XTFeOCK4gNgePsfPvgZoQ5xHD2DVsg',
    //...other fetch options
  });

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.apiUrl}/images/upload`, formData);
  }
  createCollage(file: File): Observable<any> {
    return this.http.post(`${this.apiUrl}/collage/create`, {});
  }

  getCollage(): Observable<any> {
    return this.http.get(`${this.apiUrl}/images/collage`);
  }

  images: any;

  getUsplashImages(): Promise<any> {
    const unsplash = createApi({
      accessKey: 'ICPmSUAIK01n3XTFeOCK4gNgePsfPvgZoQ5xHD2DVsg',
    });
    return unsplash.photos.list({ page: 1, perPage: 1000 });
  }
}
