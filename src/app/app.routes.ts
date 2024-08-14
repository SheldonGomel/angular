import { Routes } from '@angular/router';
import { MainPageComponent } from './youtube/pages/main-page/main-page.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { DetailedInfoPageComponent } from './youtube/pages/detailed-info-page/detailed-info-page.component';
import { NotFoundPageComponent } from './shared/pages/not-found-page/not-found-page.component';
import { AuthGuard } from './auth/guards/auth.service';
import { AdminPageComponent } from './auth/pages/admin-page/admin-page.component';
import { FavoritePageComponent } from './favorite/pages/favorite-page/favorite-page.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: 'fav', component: FavoritePageComponent },
  { path: 'more/:id', component: DetailedInfoPageComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundPageComponent, canActivate: [AuthGuard] },
];
