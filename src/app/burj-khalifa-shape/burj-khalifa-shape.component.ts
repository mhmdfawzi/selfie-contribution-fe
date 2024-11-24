import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { gsap } from 'gsap';
import { WebSocketService } from '../shared/services/socket.service';

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
export class BurjKhalifaShapeComponent implements OnInit, OnDestroy {
  @Input() images: string[] = []; // User-provided images
  @Input() imageUrl: string = ''; // URL of Burj Khalifa or any shape image
  @Input() tileCount: number = 100; // Total number of tiles (input)
  @Input() defaultTileColor: string = '#ffffff'; // Background color for tiles with no image

  constructor(private socketService: WebSocketService) {}

  grid: Tile[] = []; // Grid array containing Tile objects
  gridColumns: number = 0;
  gridRows: number = 0;
  tileSize: number = 0; // Dynamically calculated tile size
  greyColor: string = '#F2F2F2';

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  auto = false;
  m = { x: 0, y: 0 };

  ngOnInit(): void {
    this.generateGridFromImage();
    // this.initializeFireworks();

    // this.socketService.listen('newTile').subscribe((data) => {
    //   console.log('New tile received:', data);
    //   // Handle the data received from the server (e.g., animate or update the grid)
    // });
  }

  ngOnDestroy(): void {
    // Cleanup socket connection when the component is destroyed
    // this.socketService.disconnect();
  }

  sendTileData() {
    // const tileData = { tileId: 1, image: 'image-url.jpg' };
    // this.socketService.emit('addTile', tileData); // Emitting an event to the server
  }

  initializeFireworks() {
    const stage = document.querySelector('.stage') as SVGGElement;
    const toggle = document.querySelector('.toggle') as SVGGElement;

    window.onpointerdown = window.onpointermove = (e: PointerEvent) => {
      this.m.x = Math.round(e.clientX);
      this.m.y = Math.round(e.clientY);
    };

    // stage.onpointerup = (e: PointerEvent) => {
    //   gsap.killTweensOf(this.autoPlay);
    //   gsap.killTweensOf(this.fire);
    //   this.auto = true;
    //   this.toggleAuto();
    //   this.fire(this.m);
    // };

    // toggle.onpointerup = this.toggleAuto.bind(this);
  }

  fire(m: { x: number; y: number }) {
    const stage = document.querySelector('.stage') as SVGGElement;
    const firework = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'g'
    );
    const trail = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const ring = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const hsl = `hsl(${gsap.utils.random(0, 360, 1)}, 100%, 50%)`;

    stage.appendChild(firework);
    firework.appendChild(trail);
    firework.appendChild(ring);

    for (let i = 1; i < 5; i++) {
      const t = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      gsap.set(t, {
        x: m.x,
        y: window.innerHeight,
        opacity: 0.25,
        attr: { 'stroke-width': i, d: `M0,0 0,${window.innerHeight}` },
      });
      gsap.to(t, { y: m.y, ease: 'expo' });
      trail.appendChild(t);
    }

    for (let i = 1; i < gsap.utils.random(6, 13, 1); i++) {
      const c = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'circle'
      );
      gsap.set(c, {
        x: m.x,
        y: m.y,
        attr: {
          class: 'core',
          r: (i / 1.5) * 18,
          fill: 'none',
          stroke: hsl,
          'stroke-width': 0.25 + (9 - i),
          'stroke-dasharray': `1 ${(i / 2) * gsap.utils.random(i + 3, i + 6)}`,
        },
      });
      ring.appendChild(c);
    }

    gsap
      .timeline({
        onComplete: () => {
          stage.removeChild(firework); // Perform the removal, but do not return it
        },
      })
      .to(
        trail.children,
        {
          duration: 0.2,
          attr: { d: 'M0,0 0,0' },
          stagger: -0.08,
          ease: 'expo.inOut',
        },
        0
      )
      .to(
        trail.children,
        {
          duration: 0.4,
          scale: gsap.utils.random(40, 80, 1),
          attr: { stroke: hsl },
          stagger: -0.15,
          ease: 'expo',
        },
        0.4
      )
      .to(
        trail.children,
        { duration: 0.3, opacity: 0, ease: 'power2.inOut', stagger: -0.1 },
        0.5
      )
      .from(
        ring.children,
        {
          duration: 1,
          rotate: gsap.utils.random(-90, 90, 1),
          scale: 0,
          stagger: 0.05,
          ease: 'expo',
        },
        0.4
      )
      .to(ring.children, { opacity: 0, stagger: 0.1, ease: 'sine.inOut' }, 0.7)
      .to(ring.children, { duration: 1, y: '+=30', ease: 'power2.in' }, 0.7);
  }

  toggleAuto() {
    const auto = !this.auto;
    gsap
      .timeline({ defaults: { duration: 0.3, ease: 'power2.inOut' } })
      .to('.knob', { x: auto ? 18 : 0 }, 0)
      .to('.txt1', { opacity: auto ? 0.3 : 1 }, 0)
      .to('.txt2', { opacity: auto ? 1 : 0.3 }, 0);

    if (auto) {
      this.autoPlay();
    } else {
      gsap.killTweensOf(this.autoPlay);
      gsap.killTweensOf(this.fire);
    }
  }

  autoPlay() {
    for (let i = 0; i < gsap.utils.random(3, 9, 1); i++) {
      gsap.delayedCall(i / 2, this.fire, [
        {
          x: gsap.utils.random(99, window.innerWidth - 99, 1),
          y: gsap.utils.random(99, window.innerHeight - 99, 1),
        },
      ]);
    }

    if (this.auto) {
      gsap.delayedCall(3.5, this.autoPlay.bind(this));
    } else {
      gsap.killTweensOf(this.autoPlay);
    }

    setTimeout(() => {
      this.flipImage();
    }, 3000); // 2000 milliseconds = 2 seconds
  }

  onClick() {
    console.log('clcik');
  }

  onClickPath() {
    console.log('on');
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
              visible: alpha > 128,
              block: alpha > 128 ? this.greyColor : '',
            };

            if (tile.visible) {
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
    ) as HTMLElement[];

    tiles.reverse().forEach((tile: HTMLElement, index: number) => {
      const startX =
        Math.random() * window.innerWidth * (Math.random() > 0.5 ? -1 : 1);
      const startY =
        Math.random() * window.innerHeight * (Math.random() > 0.5 ? -1 : 1);

      gsap.set(tile, {
        x: startX,
        y: startY,
        opacity: 0,
        scale: 12,
      });

      gsap.to(tile, {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        delay: index * 0.02,
        duration: 2,
        ease: 'back.in',
        onComplete: () => {
          // Once the last tile has completed the animation, start the fireworks
          if (index === tiles.length - 1) {
            // this.startFireworks();
          }
        },
      });
    });
  }

  // Function to start the fireworks
  startFireworks() {
    this.auto = false; // Enable auto mode for continuous fireworks
    this.autoPlay(); // Start the fireworks automatically
  }

  // Called when the user clicks the "Animate Next Tile" button
  animateNextTile() {
    // this.flipImage();
    this.fileInput.nativeElement.click(); // Trigger the file input to open
  }

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
          const tileIndex = this.grid.indexOf(nextTile);
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
            scale: 18,
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

  onImageUrlReceived(imageUrl: string): void {
    if (imageUrl) {
      // Find the last grey tile (without an image and is visible) starting from the bottom
      const nextTile = [...this.grid]
        .reverse()
        .find((tile) => !tile.image && tile.visible);
  
      if (nextTile) {
        nextTile.image = imageUrl; // Set the image URL for the tile
  
        // Animate this tile to its position
        const tileIndex = this.grid.indexOf(nextTile);
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
          scale: 18,
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
    }
  }
  

  // Helper function to get a random color
  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  trackByFn(index: number, item: Tile): number {
    return index;
  }
  @ViewChild('flipper') flipper!: ElementRef;
  @ViewChild('frontImage') frontImage!: ElementRef;
  @ViewChild('backImage') backImage!: ElementRef;

  flipImage() {
    gsap.to(this.flipper.nativeElement, {
      duration: 0.6,
      rotateY: 180,
      ease: 'power2.inOut',
    });
  }
}
