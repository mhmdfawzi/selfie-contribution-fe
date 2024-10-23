// import { CommonModule } from '@angular/common';
// import { Component, Input } from '@angular/core';

// // Define the Tile interface
// interface Tile {
//   visible: boolean;
//   image?: string; // Optional image property
// }

// @Component({
//   selector: 'app-burj-khalifa-shape',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './burj-khalifa-shape.component.html',
//   styleUrl: './burj-khalifa-shape.component.css',
// })
// export class BurjKhalifaShapeComponent {
//   @Input() images: string[] = []; // User-provided images
//   @Input() tileSize: number = 25; // Control the tile size
//   @Input() imageUrl: string = ''; // URL of Burj Khalifa or any shape image

//   grid: Tile[] = []; // Grid array containing Tile objects
//   gridColumns: number = 0;
//   gridRows: number = 0;

//   ngOnInit(): void {
//     this.generateGridFromImage();
//   }

//   // Generate the grid based on the input image
//   generateGridFromImage() {
//     const canvas = document.createElement('canvas');
//     const context = canvas.getContext('2d');
//     const image = new Image();

//     image.src = this.imageUrl;
//     image.crossOrigin = 'Anonymous'; // To avoid CORS issues
//     image.onload = () => {
//       const scaledWidth = Math.floor(image.width / this.tileSize);
//       const scaledHeight = Math.floor(image.height / this.tileSize);

//       canvas.width = scaledWidth;
//       canvas.height = scaledHeight;

//       context?.drawImage(image, 0, 0, scaledWidth, scaledHeight);

//       const imageData = context?.getImageData(0, 0, scaledWidth, scaledHeight);
//       const pixelData = imageData?.data;

//       if (pixelData) {
//         this.gridColumns = scaledWidth;
//         this.gridRows = scaledHeight;

//         let imageIndex = 0;
//         for (let y = 0; y < scaledHeight; y++) {
//           for (let x = 0; x < scaledWidth; x++) {
//             const index = (y * scaledWidth + x) * 4; // RGBA data
//             const alpha = pixelData[index + 3]; // Alpha channel

//             const visible = alpha > 128; // If alpha is high enough, the pixel is part of the shape
//             const tile: Tile = { visible: visible };

//             if (visible && this.images.length > 0) {
//               tile.image = this.images[imageIndex % this.images.length];
//               imageIndex++;
//             }

//             this.grid.push(tile);
//           }
//         }
//       }
//     };
//   }
// }

import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { gsap } from 'gsap';

// Define the Tile interface
interface Tile {
  visible: boolean;
  image?: string; // Optional image property
  block: string;
}

@Component({
  selector: 'app-burj-khalifa-shape',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './burj-khalifa-shape.component.html',
  styleUrls: ['./burj-khalifa-shape.component.css'],
})
export class BurjKhalifaShapeComponent implements OnInit {
  @Input() images: string[] = []; // User-provided images
  @Input() imageUrl: string = ''; // URL of Burj Khalifa or any shape image
  @Input() tileCount: number = 100; // Total number of tiles (input)
  @Input() defaultTileColor: string = '#fffff'; // Background color for tiles with no image

  grid: Tile[] = []; // Grid array containing Tile objects
  gridColumns: number = 0;
  gridRows: number = 0;
  tileSize: number = 0; // Dynamically calculated tile size
  greyColor: string = '#F2F2F2';

  ngOnInit(): void {
    this.generateGridFromImage();
  }

  // Generate the grid based on the input image and calculated tileSize
  generateGridFromImage() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const image = new Image();
  
    image.src = this.imageUrl;
    image.crossOrigin = 'Anonymous'; // To avoid CORS issues
    image.onload = () => {
      // Calculate tile size and generate the grid from the image
      const totalPixels = image.width * image.height;
      const pixelsPerTile = Math.floor(totalPixels / this.tileCount);
      this.tileSize = Math.floor(Math.sqrt(pixelsPerTile));
  
      const scaledWidth = Math.floor(image.width / this.tileSize);
      const scaledHeight = Math.floor(image.height / this.tileSize);
  
      canvas.width = scaledWidth;
      canvas.height = scaledHeight;
      context?.drawImage(image, 0, 0, scaledWidth, scaledHeight);
  
      const imageData = context?.getImageData(0, 0, scaledWidth, scaledHeight);
      const pixelData = imageData?.data;
  
      if (pixelData) {
        this.gridColumns = scaledWidth;
        this.gridRows = scaledHeight;
  
        const visibleTiles: Tile[] = [];
  
        // Generate the grid based on visible pixels in the image
        for (let y = 0; y < scaledHeight; y++) {
          for (let x = 0; x < scaledWidth; x++) {
            const index = (y * scaledWidth + x) * 4; // RGBA data
            const alpha = pixelData[index + 3]; // Alpha channel
  
            const visible = alpha > 128; // Consider it part of the shape if alpha is high enough
            const tile: Tile = {
              visible: visible,
              block: visible ? this.greyColor : '',
            };
  
            if (visible) {
              visibleTiles.push(tile);
            }
  
            this.grid.push(tile);
          }
        }
  
        // Assign images to the visible tiles from bottom to top
        let reverseIndex = visibleTiles.length - 1;
        for (let i = 0; i < this.images.length; i++) {
          if (reverseIndex >= 0) {
            visibleTiles[reverseIndex].image =
              this.images[i % this.images.length];
            reverseIndex--;
          }
        }
  
        // Animate the tiles after the grid is rendered
        setTimeout(() => {
          this.animateTilesBack(); // Delay this until the grid is fully in place
        }, 100); // Small delay to ensure tiles are rendered before animating
      }
    };
  }
  

  animateTilesBack() {
    const tiles = document.querySelectorAll('.collage-tile'); // Targeting the correct class
  
    tiles.forEach((tile: any, index: number) => {
      // Start from random positions off-screen
      const startX =
        Math.random() * window.innerWidth * (Math.random() > 0.5 ? -1 : 1);
      const startY =
        Math.random() * window.innerHeight * (Math.random() > 0.5 ? -1 : 1);
  
      // Set initial position of each tile to be off-screen
      gsap.set(tile, {
        x: startX,
        y: startY,
        opacity: 0, // Set opacity to 0 initially
      });
  
      // Animate each tile back to its original position
      gsap.to(tile, {
        x: 0, // Move back to the original x position
        y: 0, // Move back to the original y position
        opacity: 1, // Fade in the tile
        delay: index * 0.02, // Slight stagger for each tile (to spread animation over time)
        duration: 10, // 10-second animation
        ease: 'back.in', // Smooth easing
        // ease: 'power2.out', // Smooth easing
      });
    });
  }
  
  

}