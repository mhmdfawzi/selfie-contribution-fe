// src/app/app.component.ts
import { Component } from '@angular/core';
import { CollageComponent } from './collage/collage.component'; // Import the routing module
import { BurjKhalifaShapeComponent } from './burj-khalifa-shape/burj-khalifa-shape.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [CollageComponent, BurjKhalifaShapeComponent , RouterModule], // Add the routing module here
})
export class AppComponent {}
