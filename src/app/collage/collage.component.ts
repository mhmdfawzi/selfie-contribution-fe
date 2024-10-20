// collage.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BurjKhalifaShapeComponent } from '../burj-khalifa-shape/burj-khalifa-shape.component';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-collage',
  templateUrl: './collage.component.html',
  styleUrls: ['./collage.component.css'],
  standalone: true,
  imports: [CommonModule, BurjKhalifaShapeComponent],
})
export class CollageComponent implements OnInit {
  selfieURLs: string[] = [];
  tilesCount: number = 1000;
  collageShape: string = 'assets/burj-khalifa.png';

  constructor(private imageService: ImageService) {}
  ngOnInit(): void {
    this.selfieURLs = Array(1000).fill('assets/selfie.jpg');
    this.tilesCount = 30000;

    // this.imageService.getUsplashImages().then((res) => {
    //   console.log(res.response.results);
    //   res.response.results.forEach((item: any) => {
    //     console.log(item.urls.full);
    //   });
    // });
  }
}
