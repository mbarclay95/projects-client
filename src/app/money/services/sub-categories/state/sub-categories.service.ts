import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { SubCategory } from '../../../models/sub-category.model';
import { SubCategoriesStore } from './sub-categories.store';

@Injectable({ providedIn: 'root' })
export class SubCategoriesService {

  constructor(private subCategoriesStore: SubCategoriesStore, private http: HttpClient) {
  }


  get() {
    return this.http.get<SubCategory[]>('https://api.com').pipe(tap(entities => {
      this.subCategoriesStore.set(entities);
    }));
  }

  add(subCategory: SubCategory) {
    this.subCategoriesStore.add(subCategory);
  }

  update(id, subCategory: Partial<SubCategory>) {
    this.subCategoriesStore.update(id, subCategory);
  }

  remove(id: ID) {
    this.subCategoriesStore.remove(id);
  }

}
