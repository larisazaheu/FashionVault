import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard-page/dashboard-page.component').then(m => m.DashboardPageComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login-page/login-page.component').then(m => m.LoginPageComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register-page/register-page.component').then(m => m.RegisterPageComponent)
  },
  {
    path: 'wardrobe',
    loadComponent: () => import('./pages/wardrobe-page/wardrobe-page.component').then(m => m.WardrobeListPageComponent),
  },
  {
    path: 'laundry',
    loadComponent: () => import('./pages/laundry-page/laundry-page.component').then(m => m.LaundryPageComponent),
  },
  {
    path: 'outfits',
    loadComponent: () => import('./pages/outfits-page/outfits-page.component').then(m => m.OutfitsPageComponent),
  },
  {
    path: 'weather',
    loadComponent: () => import('./pages/weather-page/weather-page.component').then(m => m.WeatherPageComponent),
  },
  {
    path: 'favorites',
    loadComponent: () => import('./pages/favorites-page/favorites-page.component').then(m => m.FavoritesPageComponent),
  },
  {
    path: 'palette',
    loadComponent: () => import('./pages/palette-page/palette-page.component').then(m => m.PalettePageComponent),
  },
  {
    path: 'capsule',
    loadComponent: () => import('./pages/capsule-page/capsule-page.component').then(m => m.CapsulePageComponent),
  },
  {
    path: 'planner',
    loadComponent: () => import('./pages/planner-page/planner-page.component').then(m => m.PlannerPageComponent),
  },
  {
    path: 'declutter',
    loadComponent: () => import('./pages/declutter-page/declutter-page.component').then(m => m.DeclutterPageComponent),
  },
  {
    path: 'travel',
    loadComponent: () => import('./pages/travel-page/travel-page.component').then(m => m.TravelPageComponent),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];