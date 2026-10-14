import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Корневой компонент используется ТОЛЬКО при самостоятельном запуске
// (http://localhost:4201). В shell он не загружается: shell берёт
// маршруты из app.routes.ts и рендерит страницы в свой <router-outlet>.
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('recipenest-mf-recipes');
}
