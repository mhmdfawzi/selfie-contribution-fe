// src/app/upload/upload.component.ts
import { Component } from '@angular/core';
import { ImageService } from '../image.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  standalone: true,
  templateUrl: './upload.component.html',
  imports: [CommonModule, HttpClientModule], // Import HttpClientModule here
})
export class UploadComponent {
  selectedFile: File | null = null;

  constructor(private imageService: ImageService, private router: Router) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (this.selectedFile) {
      this.imageService.uploadImage(this.selectedFile).subscribe(
        (response) => {
          console.log('Image uploaded successfully!', response);
          this.selectedFile = null; // Reset the file input
        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );
    }
  }

  navigateToCollage() {
    this.router.navigate(['/collage']);
  }
}
