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
  // Generate the grid based on the input image and calculated tileSize
  generateGridFromImage() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const image = new Image();

    image.src = this.imageUrl;
    image.crossOrigin = 'Anonymous'; // To avoid CORS issues
    image.onload = () => {
      // Calculate the appropriate tile size based on the image dimensions and tileCount
      const totalPixels = image.width * image.height;
      const pixelsPerTile = Math.floor(totalPixels / this.tileCount);

      // Calculate the tile size (approximate square root of pixels per tile)
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
        let imageIndex = 0;

        // Loop through rows in normal order (top to bottom) to draw the shape
        for (let y = 0; y < scaledHeight; y++) {
          for (let x = 0; x < scaledWidth; x++) {
            const index = (y * scaledWidth + x) * 4; // RGBA data
            const alpha = pixelData[index + 3]; // Alpha channel

            const visible = alpha > 128; // If alpha is high enough, the pixel is part of the shape
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

        // Now, fill the visible tiles from bottom to top using the images
        let reverseIndex = visibleTiles.length - 1; // Start from the bottom-most visible tile
        for (let i = 0; i < this.images.length; i++) {
          if (reverseIndex >= 0) {
            visibleTiles[reverseIndex].image =
              this.images[i % this.images.length];
            reverseIndex--;
          }
        }
      }
    };
  }
}
