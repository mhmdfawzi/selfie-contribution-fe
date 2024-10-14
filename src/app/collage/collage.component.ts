// collage.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BurjKhalifaShapeComponent } from '../burj-khalifa-shape/burj-khalifa-shape.component';

@Component({
  selector: 'app-collage',
  templateUrl: './collage.component.html',
  styleUrls: ['./collage.component.css'],
  standalone: true,
  imports: [CommonModule, BurjKhalifaShapeComponent],
})
export class CollageComponent {
  imageUrls: string[] = ['assets/selfie.jpg'];
}
