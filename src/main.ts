// src/main.ts or wherever you bootstrap your application
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { appRoutes, AppRoutingModule } from './app/app-routing.module'; // Update the import to use named import

bootstrapApplication(AppComponent, {
  providers: [provideRouter(appRoutes), provideHttpClient()],
}).catch(err => console.error(err));
