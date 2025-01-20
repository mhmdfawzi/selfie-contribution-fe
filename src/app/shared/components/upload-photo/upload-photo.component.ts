import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from 'src/app/shared/services/socket.service';

@Component({
  selector: 'app-upload-photo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.css'],
})
export class UploadPhotoComponent {
  uploadedFileName: string | null = null;
  uploadedFileSize: string | null = null;

  isFileValid: boolean = false;
  fileError: string | null = null;

  previewUrl: string | null = null;
  uploadedFile: File | null = null;

  constructor(
    private router: Router,
    private socketService: WebSocketService
  ) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const fileSizeInMB = file.size / (1024 * 1024);
      const fileSizeInKB = file.size / 1024;

      if (!file.type.match(/image\/(jpeg|jpg|png)/)) {
        this.fileError =
          'Invalid file type. Please upload a JPG, JPEG, or PNG file.';
        this.resetFileState();
        return;
      }

      this.uploadedFileName = file.name;
      this.uploadedFileSize =
        fileSizeInMB >= 1
          ? `${fileSizeInMB.toFixed(2)} MB`
          : `${fileSizeInKB.toFixed(2)} KB`;

      this.uploadedFile = file;
      this.isFileValid = true;
      this.fileError = null;

      // Generate preview URL for the image
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      this.resetFileState();
    }
  }

  resetFileState() {
    this.uploadedFileName = null;
    this.uploadedFileSize = null;
    this.isFileValid = false;
    this.previewUrl = null;
    this.uploadedFile = null;
  }

  // navToBurjEvent() {
  //   if (this.isFileValid) {
  //     console.log(
  //       'Navigating to the Burj event with uploaded file:',
  //       this.uploadedFileName
  //     );
  //     this.router.navigate(['collage']);
  //   }
  // }

  navToBurjEvent() {
    if (this.isFileValid && this.uploadedFile) {
      this.socketService.uploadImage(this.uploadedFile).subscribe({
        next: (response: any) => {
          console.log('Upload successful:', response);
          this.router.navigate(['collage']);
          // this.socketService.sendPhotoToEvent();
        },
        error: (err: any) => {
          console.error('Upload failed:', err);
        },
      });
      // this.socketService.connect();
      console.log('Connected');
      // this.socketService.uploadImage();
      console.log('Uploaded img');
      // this.router.navigate(['collage']);
      console.log('Navigated');
    }
  }
}
