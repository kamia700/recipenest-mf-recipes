import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

// Используется ТОЛЬКО при самостоятельном запуске remote-а (bootstrap.ts,
// http://localhost:4201). Когда App загружается в shell, эти провайдеры
// не регистрируются — работает конфиг shell-а.
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay())
  ]
};
