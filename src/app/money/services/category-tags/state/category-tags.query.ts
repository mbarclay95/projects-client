import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CategoryTagsStore, CategoryTagsState } from './category-tags.store';

@Injectable({ providedIn: 'root' })
export class CategoryTagsQuery extends QueryEntity<CategoryTagsState> {

  constructor(protected store: CategoryTagsStore) {
    super(store);
  }

}
