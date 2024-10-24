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
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
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

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animateTiles(this.grid.filter(tile => tile.visible));
    }, 0);
  }

  private generateGridFromImage() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const image = new Image();

    image.src = this.imageUrl;
    image.crossOrigin = 'Anonymous'; // To avoid CORS issues
    image.onload = () => {
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
        let imageIndex = 0;

        // Process grid generation in batches to avoid blocking the main thread
        const batchSize = 500; // Adjust batch size as needed
        const processBatch = (start: number) => {
          for (let i = start; i < Math.min(pixelData.length, start + batchSize); i += 4) {
            const index = i / 4;
            const alpha = pixelData[i + 3];

            const tile: Tile = {
              visible: alpha > 128,
              block: alpha > 128 ? this.greyColor : '',
            };

            if (tile.visible) {
              visibleTiles.push(tile);
            }

            this.grid.push(tile);
          }

          if (start + batchSize < pixelData.length) {
            requestAnimationFrame(() => processBatch(start + batchSize));
          } else {
            // Continue with the animation after grid generation
            this.assignImagesToTiles(visibleTiles); // Call the new method
            setTimeout(() => {
              this.animateTiles(visibleTiles);
            }, 0);
          }
        };

        processBatch(0);
      }
    };
  }

  private assignImagesToTiles(visibleTiles: Tile[]) {
    let reverseIndex = visibleTiles.length - 1; // Start from the bottom-most visible tile
    for (let i = 0; i < this.images.length; i++) {
      if (reverseIndex >= 0) {
        visibleTiles[reverseIndex].image = this.images[i % this.images.length];
        reverseIndex--;
      }
    }
  }

  private animateTiles(visibleTiles: Tile[]) {
    visibleTiles.forEach((tile, index) => {
      if (tile.visible) {
        const finalX = (index % this.gridColumns) * this.tileSize; // Final X position
        const finalY = Math.floor(index / this.gridColumns) * this.tileSize; // Final Y position
  
        // GSAP set initial state: start with a very large size and opacity 0
        gsap.set(`.collage-tile:nth-child(${index + 1})`, {
          x: finalX,
          y: finalY + window.innerHeight, // Start from offscreen (below)
          scale: 3, // Start from a larger size (adjust as needed)
          opacity: 0, // Initially invisible
        });
  
        // GSAP animate to the final position with shrinking effect
        gsap.to(`.collage-tile:nth-child(${index + 1})`, {
          duration: 1.5, // Animation duration
          x: finalX,
          y: finalY, // Final position in grid
          scale: 1, // Shrink down to normal size
          opacity: 1, // Fade in
          ease: "power3.out", // Smooth easing
          delay: index * 0.1, // Stagger effect (slightly delay each tile)
        });
      }
    });
  }

  
  trackByFn(index: number, item: Tile) {
    return index; // Use the index as a unique identifier
  }
}



