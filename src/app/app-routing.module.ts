// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { CollageComponent } from './collage/collage.component';
import { LogInComponent } from './shared/components/log-in/log-in.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { AuthComponent } from './shared/components/auth/auth.component';
import { NikeNameComponent } from './shared/components/nike-name/nike-name.component';
import { HomeComponent } from './shared/components/home/home.component';
import { IntroComponent } from './shared/components/intro/intro.component';
import { QrcodeComponent } from './shared/components/qrcode/qrcode.component';
import { DubaiPoliceComponent } from './dubai-police/dubai-police.component';
import { SuccessComponent } from './shared/components/success/success.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'intro', component: IntroComponent },
  { path: 'qrcode', component: QrcodeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'nike-name', component: NikeNameComponent },
  { path: 'home', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'login', component: LogInComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'collage', component: CollageComponent },
  { path: 'success', component: SuccessComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const appRoutes = routes;