import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

// Define the Tile interface
interface Tile {
  visible: boolean;
  image?: string; // Optional image property
}

@Component({
  selector: 'app-burj-khalifa-shape',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './burj-khalifa-shape.component.html',
  styleUrl: './burj-khalifa-shape.component.css',
})
export class BurjKhalifaShapeComponent {
  @Input() images: string[] = []; // User-provided images
  @Input() tileSize: number = 25; // Control the tile size
  @Input() imageUrl: string = ''; // URL of Burj Khalifa or any shape image

  grid: Tile[] = []; // Grid array containing Tile objects
  gridColumns: number = 0;
  gridRows: number = 0;

  ngOnInit(): void {
    this.generateGridFromImage();
  }

  // Generate the grid based on the input image
  generateGridFromImage() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const image = new Image();

    image.src = this.imageUrl;
    image.crossOrigin = 'Anonymous'; // To avoid CORS issues
    image.onload = () => {
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

        let imageIndex = 0;
        for (let y = 0; y < scaledHeight; y++) {
          for (let x = 0; x < scaledWidth; x++) {
            const index = (y * scaledWidth + x) * 4; // RGBA data
            const alpha = pixelData[index + 3]; // Alpha channel

            const visible = alpha > 128; // If alpha is high enough, the pixel is part of the shape
            const tile: Tile = { visible: visible };

            if (visible && this.images.length > 0) {
              tile.image = this.images[imageIndex % this.images.length];
              imageIndex++;
            }

            this.grid.push(tile);
          }
        }
      }
    };
  }
}
