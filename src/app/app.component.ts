// src/app/app.component.ts
import { Component } from '@angular/core';
import { CollageComponent } from './collage/collage.component'; // Import the routing module
import { BurjKhalifaShapeComponent } from './burj-khalifa-shape/burj-khalifa-shape.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    CollageComponent,
    BurjKhalifaShapeComponent,
    RouterModule,
    HttpClientModule,
  ],
})
export class AppComponent {}
