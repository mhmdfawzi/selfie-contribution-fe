// src/app/app.component.ts
import { Component } from '@angular/core';
import { CollageComponent } from './collage/collage.component'; // Import the routing module
import { BurjKhalifaShapeComponent } from './burj-khalifa-shape/burj-khalifa-shape.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [CollageComponent, BurjKhalifaShapeComponent], // Add the routing module here
})
export class AppComponent {}
