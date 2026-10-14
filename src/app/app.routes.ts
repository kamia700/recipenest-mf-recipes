import { Routes } from '@angular/router';

// КРИТИЧНО: эти маршруты экспортируются в shell (exposes './Routes') и
// монтируются там под префиксом /recipes. Пути — относительные:
// '' здесь = /recipes в shell и / при самостоятельном запуске на 4201.
// Те же маршруты использует provideRouter() в app.config.ts.
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./recipe-list/recipe-list').then(m => m.RecipeList)
  }
];
