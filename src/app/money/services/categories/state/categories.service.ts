import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { Category } from './category.model';
import { CategoriesStore } from './categories.store';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  constructor(
    private categoriesStore: CategoriesStore,
    private http: HttpClient,
  ) {}

  get() {
    return this.http.get<Category[]>('https://api.com').pipe(
      tap((entities) => {
        this.categoriesStore.set(entities);
      }),
    );
  }

  add(category: Category) {
    this.categoriesStore.add(category);
  }

  update(id, category: Partial<Category>) {
    this.categoriesStore.update(id, category);
  }

  remove(id: ID) {
    this.categoriesStore.remove(id);
  }
}
