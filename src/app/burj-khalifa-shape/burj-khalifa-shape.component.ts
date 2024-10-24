import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef; // Reference to the file input

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

        setTimeout(() => {
          this.animateTilesBack(); // Delay this until the grid is fully in place
        }, 1); // Small delay to ensure tiles are rendered before animating
      }
    };
  }

  animateTilesBack() {
    const tiles = Array.from(
      document.querySelectorAll('.collage-tile.captured')
    ); // Targeting the correct class

    tiles.reverse().forEach((tile: Element, index: number) => {
      const startX =
        Math.random() * window.innerWidth * (Math.random() > 0.5 ? -1 : 1);
      const startY =
        Math.random() * window.innerHeight * (Math.random() > 0.5 ? -1 : 1);

      gsap.set(tile, {
        x: startX,
        y: startY,
        opacity: 0,
        scale: 8
      });

      gsap.to(tile, {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        delay: index * 0.02,
        duration: 2,
        ease: 'back.in',
      });
    });
  }

  // Called when the user clicks the "Animate Next Tile" button
  animateNextTile() {
    this.fileInput.nativeElement.click(); // Trigger the file input to open
  }

  // Handles file selection and animates a new tile
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const selectedImageUrl = e.target.result;
  
        // Find the last grey tile (without an image and is visible) starting from the bottom
        const nextTile = [...this.grid]
          .reverse()
          .find((tile) => !tile.image && tile.visible);
  
        if (nextTile) {
          nextTile.image = selectedImageUrl;
  
          // Animate this tile to its position
          const tileIndex = this.grid.indexOf(nextTile); // Get the index of the nextTile in the grid
          const tileElement = document.querySelector(
            `.collage-tile:nth-child(${tileIndex + 1})`
          ) as HTMLElement;
  
          const startX =
            Math.random() * window.innerWidth * (Math.random() > 0.5 ? -1 : 1);
          const startY =
            Math.random() * window.innerHeight * (Math.random() > 0.5 ? -1 : 1);
  
          gsap.set(tileElement, {
            x: startX,
            y: startY,
            opacity: 0,
            scale: 8,
          });
  
          gsap.to(tileElement, {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 2,
            ease: 'power2.out',
          });
        }
      };
      reader.readAsDataURL(file); // Convert the selected file to a data URL
    }
  }
}
