import { Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { CollageComponent } from './collage/collage.component';
import { LogInComponent } from './shared/components/log-in/log-in.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { NickNameComponent } from './shared/components/nick-name/nick-name.component';
import { HomeComponent } from './shared/components/home/home.component';
import { IntroComponent } from './shared/components/intro/intro.component';
import { SuccessComponent } from './shared/components/success/success.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'intro', component: IntroComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'nick-name', component: NickNameComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LogInComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'collage', component: CollageComponent },
  { path: 'success', component: SuccessComponent },
];
