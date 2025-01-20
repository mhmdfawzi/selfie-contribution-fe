import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.css'
})
export class IntroComponent {
  images = [
    {
      src: 'https://cdn.britannica.com/67/92867-050-BC3DC984/cameras-camera-reviews-crystal-displays-photographs-film.jpg',
      alt: 'Image 1',
      heading: 'Freezing A Moment',
      caption: 'Taking an image, freezing a moment reveals how rich reality truly is.'
    },
    {
      src: 'https://static-cse.canva.com/blob/1224804/how-to-photo-collages-social-media-print-banner-2.1067f7e3.jpg',
      alt: 'Image 2',
      heading: 'Make Amazing Photos',
      caption: 'We are making photographs to understand our lives mean to us'
    },
    {
      src: 'https://cdn.thewirecutter.com/wp-content/media/2023/10/instantcameras-2048px-02050-3x2-1.jpg?auto=webp&quality=75&crop=3:2&width=1024',
      alt: 'Image 3',
      heading: 'Saved Your Every Story',
      caption: 'Camera images is the imagination you want to create with reality'
    }
  ];
  currentIndex = 0;

  constructor(private router: Router){}

  get isLastImage(): boolean {
    return this.currentIndex === this.images.length - 1;
  }

  nextSlide() {
    if (!this.isLastImage) {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }
  }

  navigateToLogin() {
    this.router.navigateByUrl('/login')
  }


  goToSlide(index: number) {
    this.currentIndex = index;
  }

}
