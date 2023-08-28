import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { SubCategoriesStore, SubCategoriesState } from './sub-categories.store';

@Injectable({ providedIn: 'root' })
export class SubCategoriesQuery extends QueryEntity<SubCategoriesState> {

  constructor(protected store: SubCategoriesStore) {
    super(store);
  }

}
