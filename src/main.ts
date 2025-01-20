// src/main.ts or wherever you bootstrap your application
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app/app-routing.module'; // Update the import to use named import
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { httpErrorInterceptor } from './app/interceptors/http.interceptor';
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([httpErrorInterceptor]) // Add the functional interceptor here
    ),
    provideAnimations(),
    provideAnimationsAsync(),
  ],
}).catch((err) => console.error(err));
