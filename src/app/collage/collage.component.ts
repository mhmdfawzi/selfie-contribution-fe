// collage.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BurjKhalifaShapeComponent } from '../burj-khalifa-shape/burj-khalifa-shape.component';
import { ImageService } from '../image.service';
import { DubaiPoliceComponent } from '../dubai-police/dubai-police.component';
import { AlphaMaskComponent } from '../alpha-mask/alpha-mask.component';

@Component({
  selector: 'app-collage',
  templateUrl: './collage.component.html',
  styleUrls: ['./collage.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    BurjKhalifaShapeComponent,
    DubaiPoliceComponent,
    AlphaMaskComponent,
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
