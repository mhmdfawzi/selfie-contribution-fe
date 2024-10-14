// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { CollageComponent } from './collage/collage.component';

const routes: Routes = [
  { path: '', redirectTo: '/upload', pathMatch: 'full' },
  { path: 'upload', component: UploadComponent },
  { path: 'collage', component: CollageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Use forRoot only here
  exports: [RouterModule],
})
export class AppRoutingModule {}
