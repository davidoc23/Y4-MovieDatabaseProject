import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard'; // Import the AuthGuard

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate: [AuthGuard], // Protect with AuthGuard
  },
  {
    path: '',
    redirectTo: 'login', // Redirect to login by default
    pathMatch: 'full',
  },
  {
    path: 'movie-details',
    loadComponent: () => import('./movie-details/movie-details.page').then((m) => m.MovieDetailsPage),
    canActivate: [AuthGuard], // Protect with AuthGuard
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./wishlist/wishlist.page').then((m) => m.WishlistPage),
    canActivate: [AuthGuard], // Protect with AuthGuard
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.page').then((m) => m.SignupPage),
  },
  {
    path: 'password-reset',
    loadComponent: () => import('./password-reset/password-reset.page').then( m => m.PasswordResetPage)
  },
];
