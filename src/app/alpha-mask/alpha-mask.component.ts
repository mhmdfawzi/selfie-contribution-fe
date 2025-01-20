// alpha-mask.component.ts
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import p5 from 'p5';

@Component({
  selector: 'app-alpha-mask',
  template: `<div #canvasContainer></div>`,
  styles: [
    `
      div {
        width: 100%;
        height: 100%;
        position: relative;
      }
    `,
  ],
  standalone: true,
})
export class AlphaMaskComponent implements OnInit {
  @ViewChild('canvasContainer', { static: true })
  canvasContainer!: ElementRef<HTMLDivElement>;

  private p5Instance!: p5;

  ngOnInit(): void {
    this.createCanvas();
  }

  createCanvas() {
    this.p5Instance = new p5((sketch: any) => {
      let solidImage: p5.Image;
      let maskImage: p5.Image;

      sketch.preload = () => {
        solidImage = sketch.loadImage('assets/mario.png'); // Path to your solid image
        maskImage = sketch.loadImage('assets/burj-khalifa-600h.png'); // Path to your mask image
      };

      sketch.setup = () => {
        const canvas = sketch.createCanvas(800, 600); // Set your canvas size
        canvas.parent(this.canvasContainer.nativeElement); // Attach canvas to the container
      };

      sketch.draw = () => {
        sketch.clear(); // Clear previous frames

        // Draw the solid image
        sketch.image(solidImage, 0, 0, sketch.width, sketch.height);

        // Set the mask
        solidImage.mask(maskImage); // Apply the mask to the solid image

        // Draw the masked image
        sketch.image(solidImage, 0, 0, sketch.width, sketch.height);
      };
    });
  }
}
