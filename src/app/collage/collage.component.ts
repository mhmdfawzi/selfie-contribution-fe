import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BurjKhalifaShapeComponent } from '../burj-khalifa-shape/burj-khalifa-shape.component';
import { ImageService } from '../image.service';
import { DubaiPoliceComponent } from '../dubai-police/dubai-police.component';
// import { AlphaMaskComponent } from '../alpha-mask/alpha-mask.component';

@Component({
  selector: 'app-collage',
  templateUrl: './collage.component.html',
  styleUrls: ['./collage.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    BurjKhalifaShapeComponent,
    DubaiPoliceComponent,
    // AlphaMaskComponent,
  ],
})
export class CollageComponent implements OnInit {
  selfieURLs: string[] = [];
  tilesCount: number = 0;
  collageShape: string = 'assets/burj-khalifa-800h.png';

  constructor(private imageService: ImageService) {}
  ngOnInit(): void {
    this.selfieURLs = Array(500).fill('assets/selfie.jpg');
    this.tilesCount = 3000;
  }
}



// import { CommonModule } from '@angular/common';
// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { BurjKhalifaShapeComponent } from '../burj-khalifa-shape/burj-khalifa-shape.component';
// import { ImageService } from '../image.service';
// import { DubaiPoliceComponent } from '../dubai-police/dubai-police.component';
// import { AlphaMaskComponent } from '../alpha-mask/alpha-mask.component';

// @Component({
//   selector: 'app-collage',
//   templateUrl: './collage.component.html',
//   styleUrls: ['./collage.component.css'],
//   standalone: true,
//   imports: [
//     CommonModule,
//     BurjKhalifaShapeComponent,
//     DubaiPoliceComponent,
//     // AlphaMaskComponent,
//   ],
// })
// export class CollageComponent implements OnInit {
//   // @ViewChild('myCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
//   // @ViewChild('imageEl', { static: true }) imageEl!: ElementRef<HTMLImageElement>;

//   @ViewChild('collageCanvas', { static: false })
//   canvasRef!: ElementRef<HTMLCanvasElement>;

//   selfieURLs: string[] = [];
//   tilesCount: number = 0;
//   collageShape: string = 'assets/burj-khalifa-800h.png';

//   constructor(private imageService: ImageService) {}
//   ngOnInit(): void {
//     this.selfieURLs = Array(500).fill('assets/selfie.jpg');
//     this.tilesCount = 3000;
//   }

//   ngAfterViewInit(): void {
//     this.drawCanvasShape();
//   }

//   drawCanvasShape(): void {
//     const canvas = this.canvasRef.nativeElement;
//     const ctx = canvas.getContext('2d');

//     if (!ctx) {
//       console.error('Canvas 2D context not available.');
//       return;
//     }

//     const img = new Image();
//     img.src = this.collageShape;

//     img.onload = () => {
//       // Set canvas size to match the image
//       canvas.width = img.width;
//       canvas.height = img.height;

//       // Draw the image onto the canvas
//       ctx.drawImage(img, 0, 0);

//       // Get image data to analyze alpha transparency
//       const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//       const data = imageData.data;

//       // Clear the canvas
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       // Loop through the pixels to draw borders
//       for (let y = 0; y < canvas.height; y++) {
//         for (let x = 0; x < canvas.width; x++) {
//           const index = (y * canvas.width + x) * 4; // Pixel index
//           const alpha = data[index + 3]; // Alpha value

//           if (alpha > 0) {
//             // Draw black border for non-transparent pixels
//             ctx.fillStyle = 'black';
//             ctx.fillRect(x, y, 1, 1);
//           }
//         }
//       }
//     };

//     img.onerror = () => {
//       console.error('Failed to load the image at', this.collageShape);
//     };
//   }
// }
