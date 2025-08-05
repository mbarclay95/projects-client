import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { SubCategory } from '../../../models/sub-category.model';

export interface SubCategoriesState extends EntityState<SubCategory> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'sub-categories' })
export class SubCategoriesStore extends EntityStore<SubCategoriesState> {
  constructor() {
    super();
  }
}
