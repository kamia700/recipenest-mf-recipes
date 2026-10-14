import { TestBed } from '@angular/core/testing';
import { RecipeList } from './recipe-list';

describe('RecipeList', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeList],
    }).compileComponents();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(RecipeList);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Рецепты');
  });

  it('should render a row per recipe with title and cooking time', async () => {
    const fixture = TestBed.createComponent(RecipeList);
    await fixture.whenStable();
    const items = (fixture.nativeElement as HTMLElement).querySelectorAll('.recipes__item');

    expect(items.length).toBe(3);
    expect(items[0].textContent).toContain('Борщ');
    expect(items[0].querySelector('.recipes__time')?.textContent).toContain('120 мин');
  });

  it('should render empty state when there are no recipes', async () => {
    const fixture = TestBed.createComponent(RecipeList);
    fixture.componentInstance['recipes'].set([]);
    await fixture.whenStable();
    const items = (fixture.nativeElement as HTMLElement).querySelectorAll('.recipes__item');

    expect(items.length).toBe(1);
    expect(items[0].textContent).toContain('Рецептов пока нет');
  });
});
