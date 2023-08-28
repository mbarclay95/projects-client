import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { CategoryTag } from '../../../models/category-tag.model';

export interface CategoryTagsState extends EntityState<CategoryTag> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'category-tags' })
export class CategoryTagsStore extends EntityStore<CategoryTagsState> {

  constructor() {
    super();
  }

}
