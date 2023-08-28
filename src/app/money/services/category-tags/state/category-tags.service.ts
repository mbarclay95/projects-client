import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { CategoryTag } from '../../../models/category-tag.model';
import { CategoryTagsStore } from './category-tags.store';

@Injectable({ providedIn: 'root' })
export class CategoryTagsService {

  constructor(private categoryTagsStore: CategoryTagsStore, private http: HttpClient) {
  }


  get() {
    return this.http.get<CategoryTag[]>('https://api.com').pipe(tap(entities => {
      this.categoryTagsStore.set(entities);
    }));
  }

  add(categoryTag: CategoryTag) {
    this.categoryTagsStore.add(categoryTag);
  }

  update(id, categoryTag: Partial<CategoryTag>) {
    this.categoryTagsStore.update(id, categoryTag);
  }

  remove(id: ID) {
    this.categoryTagsStore.remove(id);
  }

}
