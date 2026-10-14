import { Component, signal } from '@angular/core';

interface Recipe {
  id: number;
  title: string;
  minutes: number;
}

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css'
})
export class RecipeList {
  protected readonly recipes = signal<Recipe[]>([
    { id: 1, title: 'Борщ', minutes: 120 },
    { id: 2, title: 'Сырники', minutes: 30 },
    { id: 3, title: 'Паста карбонара', minutes: 25 }
  ]);
}
