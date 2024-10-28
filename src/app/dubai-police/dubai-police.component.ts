import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-dubai-police',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dubai-police.component.html',
  styleUrls: ['./dubai-police.component.css'],
})
export class DubaiPoliceComponent implements AfterViewInit {
  @ViewChild('canvasElement', { static: true })
  canvasElement!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    this.drawCanvas();
  }

  drawCanvas() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    // Set the canvas size
    // canvas.width = 800; // Set your desired width
    // Load the solid image and mask image
    const solidImage = new Image();
    const maskImage = new Image();

    maskImage.src = 'assets/mario.png'; // Path to your solid image
    solidImage.src = 'assets/burj-khalifa-600h.png'; // Path to your mask image
    // canvas.height = 600; // Set your desired height
    canvas.width = solidImage.width;
    canvas.height = solidImage.height;

    // Draw the images once they are loaded
    solidImage.onload = () => {
      // Draw the solid image
      ctx.drawImage(solidImage, 0, 0, canvas.width, canvas.height);

      // Draw the mask image
      maskImage.onload = () => {
        // Set the composite operation to "destination-in" to apply the mask
        ctx.globalCompositeOperation = 'destination-in';

        // Draw the mask image to apply it
        ctx.drawImage(maskImage, 0, 0, canvas.width, canvas.height);

        // Reset the composite operation to default
        ctx.globalCompositeOperation = 'source-over';
      };
    };
  }
}
